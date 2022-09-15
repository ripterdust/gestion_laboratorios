import bcrypt from 'bcryptjs'

export const encryptText = async (text: string, level: number = 8) => await bcrypt.hash(text, level)
export const compare = async (t1: string = 'n', t2: string = '') => await bcrypt.compare(t1, t2)
