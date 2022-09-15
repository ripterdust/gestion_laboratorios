import Model from '../../common/model'

export class LaboratorioModel extends Model {
    constructor() {
        super()
        this.idTabla = 'laboratorio_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la tabla laboratorios',
                requerido: true,
            },
        ]

        this.nombreCampos = this.obtenerCampos()
    }
}
