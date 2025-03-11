import { HttpStatus } from "@nestjs/common";

const schema = {
	[HttpStatus.CREATED]: {
		id: 'uuid-value',
		name: 'User Name',
		email: 'user@email.com',
		password: 'hashed-password'
	},
	[HttpStatus.BAD_REQUEST]: {
		message: "Invalid user data payload.",
		error: "Bad Request",
		statusCode: 400
	},
	[HttpStatus.INTERNAL_SERVER_ERROR]: {
		message: "Internal Server Error",
		statusCode: 500
	}
}

const description = {
	[HttpStatus.CREATED]: 'Retorna um objeto com os dados do usuário criado.',
	[HttpStatus.BAD_REQUEST]: 'Retorna a mensagem de erro \'Invalid user data payload.\'.',
	[HttpStatus.INTERNAL_SERVER_ERROR]: 'Informa que houve um erro (não explicitado) no servidor.'
}

export default (status: 201 | 400 | 500) => {
	return {
		status: status,
		schema: schema[status],
		description: description[status]
	}
}