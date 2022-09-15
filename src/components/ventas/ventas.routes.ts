import { Request, Response, Router } from 'express'
import { Ruta } from '../../common/interfaces/ruta.interface'
import { autenticado } from '../../common/middlewares/Auth.middlewares'
import { VentasController } from './ventas.controller'

const router = Router()
const endPoint = '/ventas'
const controller = new VentasController()

router.all('*', autenticado)

router.get('/', (req: Request, res: Response) => {
    res.redirect('/')
})

export const ventaRuta: Ruta = {
    endPoint,
    router,
}
