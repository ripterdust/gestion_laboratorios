import { Request, Response, Router } from 'express'
import { Ruta } from '../common/interfaces/ruta.interface'
import { autenticado, noAutenticado } from '../common/middlewares/Auth.middlewares'
import { AuthController } from './auth.controller'

const endPoint: string = '/auth'
const router = Router()
const controller = new AuthController()

router.get('/logout', autenticado, (req: Request, res: Response) => req.session.destroy(() => res.redirect('/')))

router.all('*', noAutenticado)

router.get('/login', (req: Request, res: Response) => {
    res.render('auth/login', { layout: false, title: 'Login', route: `${endPoint}/login`, message: req.flash('error') })
})

router.post('/login', (req: Request, res: Response) => {
    controller.autenticar(req, res)
})

export const authRuta: Ruta = {
    endPoint,
    router,
}
