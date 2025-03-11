import SIGN_IN_EXAMPLE from './sign-in.docs'
import SIGN_UP_EXAMPLE from './sign-up.docs'
import DEPOSIT_EXAMPLE from './deposit.docs'
import WITHDRAW_EXAMPLE from './withdraw.docs'
import TRANSFER_EXAMPLE from './transfer.docs'

const examples = {
	'sign-in': SIGN_IN_EXAMPLE,
	'sign-up': SIGN_UP_EXAMPLE,
	'deposit': DEPOSIT_EXAMPLE,
	'withdraw': WITHDRAW_EXAMPLE,
	'transfer': TRANSFER_EXAMPLE
}

/**
 * Retorna um objeto para ser usado na documentação de endpoints do Swagger.
 */
const generateDocs = (endpoint: string, status: number) => examples[endpoint](status)

export default generateDocs
