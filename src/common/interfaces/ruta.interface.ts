import { Router } from 'express'

export interface Ruta {
    endPoint: string
    router: Router
}
