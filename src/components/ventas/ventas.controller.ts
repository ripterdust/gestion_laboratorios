import Controller from '../../common/controller'
import { VentasModel } from './ventas.model'

export class VentasController extends Controller {
    modelo: VentasModel
    constructor() {
        super()
        this.modelo = new VentasModel()
    }
}
