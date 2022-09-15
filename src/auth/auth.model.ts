import { respuestaAutenticacion } from '../common/interfaces/auth.interface'
import { Respuesta } from '../common/interfaces/respuesta.interface'
import Model from '../common/model'

export class AuthModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'usuarios'
        this.nombreCampos = this.obtenerCampos()
        this.idTabla = 'usuario_id'
        this.camposTabla = [
            {
                nombre: 'usuario_id',
                descripcion: 'Identificador de el usuario',
                requerido: true,
            },
            {
                nombre: 'email',
                descripcion: 'Email del usuario',
                requerido: true,
            },
            {
                nombre: 'password',
                descripcion: 'Contraseña del usuario',
                requerido: true,
            },
            {
                nombre: 'nombre_usuario',
                descripcion: 'Nombre del usuario',
                requerido: true,
            },
        ]
    }

    async obtenerPorEmail(email: string): Promise<Respuesta> {
        try {
            const pool = await this.connection.getConnection()
            const consulta = pool!.select(this.nombreCampos).from(this.nombreTabla).where('email', email)
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.error(err)
        }
    }
}
