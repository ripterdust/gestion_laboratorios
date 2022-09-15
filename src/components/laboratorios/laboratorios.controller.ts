import Controller from '../../common/controller'
import { LaboratorioModel } from './laboratorios.model'

export class LaboratorioController extends Controller {
    modelo: LaboratorioModel

    constructor() {
        super()
        this.modelo = new LaboratorioModel()
    }
}
