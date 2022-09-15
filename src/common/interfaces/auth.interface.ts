export interface respuestaAutenticacion {
    encontrado: boolean
    data?: {
        email: string
        nombre_usuario: string
        password: string
    }
}
