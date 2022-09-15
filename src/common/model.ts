import { Request } from 'express'
import { connection } from './database/connection'
import { Campo } from './interfaces/campo.interface'
import Condicion from './interfaces/condicion.interface'
import { Respuesta } from './interfaces/respuesta.interface'

export default class Model {
    idTabla: string
    nombreCampos: string[] = ['*']
    nombreTabla: string = ''
    camposTabla: Campo[]
    connection = connection
    #nombreConexion: string
    constructor() {
        this.#nombreConexion = ''
        this.idTabla = ''
        this.nombreTabla = ''
        this.camposTabla = []
    }

    public async obtieneTodos(): Promise<Respuesta> {
        try {
            const pool = await this.connection.getConnection(this.#nombreConexion)
            const consulta = pool!.select(this.nombreCampos).from(this.nombreTabla)
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.error(err)
        }
    }

    public async obtenerPorId(id: number): Promise<Respuesta> {
        try {
            const pool = await this.connection.getConnection(this.#nombreConexion)
            const consulta = pool!.select(this.nombreCampos).from(this.nombreTabla).where(this.idTabla, id)

            return this.responseHandler(await consulta)
        } catch (err) {
            return this.error(err)
        }
    }

    public async buscar(condiciones: Condicion[]): Promise<Respuesta> {
        try {
            const pool = await this.connection.getConnection(this.#nombreConexion)
            let consulta = pool!.select(this.nombreCampos).from(this.nombreTabla)
            consulta = this.#agregarCondiciones(condiciones, consulta)
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.error(err)
        }
    }

    public async agregar(registro: Record<string, any>): Promise<Respuesta> {
        try {
            const invalidos = this.#validarCampos(registro)
            if (invalidos.length > 0)
                return {
                    message: 'Campos inválidos',
                    statusCode: 400,
                    errorDetails: invalidos,
                }

            const pool = await this.connection.getConnection(this.#nombreConexion)

            const resultado = await pool!.insert(registro).into(this.nombreTabla)

            return this.responseHandler(resultado)
        } catch (err) {
            return this.error(err)
        }
    }

    public async obtenerTotal() {
        try {
            const pool = await this.connection.getConnection()
            const consulta = pool!.count('* as total').from(this.nombreTabla)
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.error(err)
        }
    }
    // Métodos privados del modelo
    protected obtenerCampos(): string[] {
        const campos: string[] = this.camposTabla.map((campo: Campo) => campo.nombre)

        return campos
    }

    protected responseHandler(resultado: any[], operacion = 'select'): Respuesta {
        let message = `Registros encontrados en la tabla ${this.nombreTabla}`
        let statusCode = 200
        let data: Record<string, any>[] = resultado
        let respuesta: Respuesta = { message, statusCode }
        switch (operacion) {
            case 'select':
                if (resultado.length === 0) {
                    message = 'No se encontraron registros'
                    statusCode = 200
                    data = resultado
                }
                respuesta = { message, statusCode, data }
                break
            case 'multipleUpdate':
                message = `Se han editado los registros de la tabla ${this.nombreTabla} exitosamente`
                respuesta = { message, statusCode }
                break
            case 'del':
                if (resultado[0] !== 0) {
                    message = `Se ha eliminado satisfactoriamente el registro ${resultado[0]}`
                    statusCode = 200
                } else {
                    message = 'El registro que se desea eliminar no existe'
                    statusCode = 404
                }
                respuesta = { message, statusCode }
                break
            case 'count':
                message = `Total registros de la tabla ${this.nombreTabla}`
                data = resultado[0]
                respuesta = { message, statusCode, data }
                break
            case 'sum':
                message = `Sumatoria de la tabla ${this.nombreTabla}`
                data = resultado[0]
                respuesta = { message, statusCode, data }
                break
        }
        return respuesta
    }
    #validarCampos(registro: Record<string, any>, estricto: boolean = true) {
        const camposInvalidos: any[] = []

        this.camposTabla.map((campo: Campo) => {
            const validaciones: any[] = []
            const existe = typeof registro[campo.nombre] !== 'undefined'
            if (campo.requerido && estricto) {
                if (!existe) {
                    validaciones.push({
                        mensaje: `El campo -${campo.nombre}- es requerido`,
                    })
                }

                if (existe) {
                    if (campo.longitudMaxima) {
                        if (registro[campo.nombre].length > campo.longitudMaxima) {
                            validaciones.push({
                                mensaje: `La longitud máxima del campo -${campo.nombre}- es de ${campo.longitudMaxima}`,
                            })
                        }
                    }
                    if (campo.longitudMinima) {
                        if (registro[campo.nombre].length > campo.longitudMinima) {
                            validaciones.push({
                                mensaje: `La longitud Mínima del campo -${campo.nombre}- es de ${campo.longitudMinima}`,
                            })
                        }
                    }
                }
            }
        })

        return camposInvalidos
    }

    #agregarCondiciones(condiciones: Condicion[], consulta: any) {
        condiciones.map((condicion: Condicion) => {
            if (condicion.operador == 'between') consulta.whereBetween(condicion.campo, [condicion.valor, condicion.valorComparacion])
            else consulta.where(condicion.campo, condicion.operador || '=', condicion.valor)
        })
        return consulta
    }

    protected error(err: any): Respuesta {
        const statusCode: number = 500
        const message: string = this.#errorSql(err, 'mysql')
        return { statusCode, message }
    }

    #errorSql(error: Record<string, any>, cliente: string): string {
        const errores = {
            duplicado: 'No es posible insertar un valor duplicado en la tabla',
        }
        if (cliente === 'mssql') {
            if (error.number === 2627) return errores.duplicado
            if (error.number === 2601) return errores.duplicado
            if (error.number === 547) return 'No es posible eliminar el registro debido a que hay otros relacionados a este'
            if (error.number === 207) return 'Nombre de columna inválido'
        }
        if (cliente == 'mysql') {
            if (error.errno === 1062) return errores.duplicado
        }
        return 'Error de base de datos desconocido'
    }
}
