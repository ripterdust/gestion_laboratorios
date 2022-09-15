import express from 'express'
import { join } from 'path'
import { Ruta } from './common/interfaces/ruta.interface'
import { rutas } from './common/routes'
import { engine } from 'express-handlebars'
import morgan from 'morgan'
import session from 'express-session'
import flash from 'connect-flash'
// Initializations
export const app = express()

// Configuration
app.set('port', process.env.PORT || 3000)
app.set('views', join(__dirname, 'views'))
const engineConfig = {
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs',
}
app.engine('.hbs', engine(engineConfig))
app.set('view engine', '.hbs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/resources', express.static('public'))
app.use('/resources', express.static(join(__dirname, 'public')))

// Middlewares
app.use(morgan('dev'))
app.use(
    session({
        secret: 'SecretoSesionAlv',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(flash())

declare module 'express-session' {
    interface SessionData {
        loggedIn: boolean
        data: any
    }
}

// Router
rutas.map((ruta: Ruta) => app.use(ruta.endPoint, ruta.router))

app.get('*', (req, res) => res.redirect('/'))
