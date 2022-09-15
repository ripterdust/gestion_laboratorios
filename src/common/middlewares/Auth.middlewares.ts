import { NextFunction, Request, Response } from 'express'

export const autenticado = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.loggedIn) return next()

    res.redirect('/auth/login')
}

export const noAutenticado = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.loggedIn) return res.redirect('/')
    next()
}
