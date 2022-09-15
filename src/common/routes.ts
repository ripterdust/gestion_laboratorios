import { Router } from 'express'
import { authRuta } from '../auth/auth.router'
import { ventaRuta } from '../components/ventas/ventas.routes'
import { Ruta } from './interfaces/ruta.interface'
import { autenticado } from './middlewares/Auth.middlewares'

const router = Router()
const endPoint = '/'

router.get('/', autenticado, (req, res) => {
    res.render('index', { nombre_usuario: req.session.data.nombre_usuario })
})

const rutasGenerales: Ruta = { endPoint, router }

export const rutas: Ruta[] = [rutasGenerales, authRuta, ventaRuta]
