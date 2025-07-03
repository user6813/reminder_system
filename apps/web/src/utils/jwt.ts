import jwt, { JwtPayload } from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key'
const EXPIRES_IN = '1h'

export function GenerateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN })
}

export function CompareToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (err) {
    return null
  }
}
