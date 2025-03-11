import { HttpStatus } from "@nestjs/common";

const schema = {
	[HttpStatus.OK]: "Success",
	[HttpStatus.BAD_REQUEST]: {
		message: "Invalid transfer payload.",
		error: "Bad Request",
		statusCode: 400
	},
	[HttpStatus.INTERNAL_SERVER_ERROR]: {
		message: "Internal Server Error",
		statusCode: 500
	}
}

const description = {
	[HttpStatus.OK]: 'Retorna a mensagem de sucesso \'Success\'.',
	[HttpStatus.BAD_REQUEST]: 'Retorna a mensagem de erro \'Invalid transfer payload.\'.',
	[HttpStatus.INTERNAL_SERVER_ERROR]: 'Informa que houve um erro (não explicitado) no servidor.'
}

export default (status: 200 | 400 | 500) => {
	return {
		status: status,
		schema: {
			example: schema[status]
		},
		description: description[status]
	}
}