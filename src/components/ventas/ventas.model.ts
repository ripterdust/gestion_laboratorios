import Model from '../../common/model'

export class VentasModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'ventas'
        this.nombreCampos = this.obtenerCampos()
        this.idTabla = 'venta_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la tabla',
                requerido: true,
            },
            {
                nombre: 'total_venta',
                descripcion: 'Identificador del total',
                requerido: true,
            },
            {
                nombre: 'ganancias',
                descripcion: 'Total de las ganancias',
                requerido: true,
            },
        ]
    }
}
