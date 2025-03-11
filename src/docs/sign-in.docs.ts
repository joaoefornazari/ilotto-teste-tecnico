import { HttpStatus } from "@nestjs/common";

const schema = {
	[HttpStatus.CREATED]: {
		token: 'token-value'
	},
	[HttpStatus.UNAUTHORIZED]: {
    message: "Invalid login payload.",
    error: "Unauthorized",
    statusCode: 401
	},
	[HttpStatus.NOT_FOUND]: {
    message: "User not found.",
    error: "Not Found",
    statusCode: 404
	},
	[HttpStatus.INTERNAL_SERVER_ERROR]: {
		message: "Internal Server Error",
		statusCode: 500
	}
}

const description = {
	[HttpStatus.CREATED]: 'Retorna um objeto com a token.',
	[HttpStatus.UNAUTHORIZED]: 'Retorna a mensagem de erro \'Invalid login payload.\'.',
	[HttpStatus.NOT_FOUND]: 'Retorna a mensagem de erro \'User not found.\'.',
	[HttpStatus.INTERNAL_SERVER_ERROR]: 'Informa que houve um erro (não explicitado) no servidor.'
}

export default (status: 201 | 401 | 500 | 404) => {
	return {
		status: status,
		schema: {
			example: schema[status]
		},
		description: description[status]
	}
}
