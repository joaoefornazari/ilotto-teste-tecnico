import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

const sanitizeToken = (token: string) => {
	return token.replace('Bearer ', '')
}


@Injectable()
export class TokenMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const auth = {
			token: req.headers.authorization
		}
		
		if (!auth.token) {
			throw new UnauthorizedException()
		}

		const secret = <string>process.env.SECRET_TOKEN
		try {
			auth.token = sanitizeToken(auth.token)

			verify(auth.token, secret, (error, decoded) => {
				if (error) throw new Error('Authentication error.')
				req.body.userId = decoded
				next()
			})
		} catch (error) {
			throw new UnauthorizedException(error)
		}
	}
}