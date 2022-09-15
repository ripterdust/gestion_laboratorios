import { Request, Response } from 'express'
import Controller from '../common/controller'
import { AuthModel } from './auth.model'
const bcryptjs: any = require('bcryptjs/dist/bcrypt')

export class AuthController extends Controller {
    modelo: AuthModel
    constructor() {
        super()
        this.modelo = new AuthModel()
    }

    async autenticar(req: Request, res: Response) {
        try {
            const { mail, password } = req.body
            if (!mail || !password) {
                req.flash('error', 'Debe de llenar los campos para continuar')
                return res.redirect('/')
            }
            const query = await this.modelo.obtenerPorEmail(mail)

            if (query.data.length === 0) {
                req.flash('error', 'Correo electrónico no encontrado')
            }

            const { data } = JSON.parse(JSON.stringify(query))

            const comp = await bcryptjs.compare(password, data[0].password)

            if (!comp) req.flash('error', 'Usuario o contraseña incorrectos')
            else {
                req.session.loggedIn = true
                req.session.data = data[0]
            }
            res.redirect('/')
        } catch (err) {
            req.flash('error', 'Error del servidor desconocido')
            res.redirect('/')
        }
    }
}
