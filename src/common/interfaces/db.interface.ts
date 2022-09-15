export interface DB {
    client: string
    connection: {
        database: string
        user: string
        password: string
        host: string
        requestTimeout: number
        port: number
        options: {
            encrypt: boolean
        }
        pool: {
            min: number
            max: number
            idleTimeoutMillis: number
        }
    }
}
