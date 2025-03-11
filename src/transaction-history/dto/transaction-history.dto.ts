export class TransactionHistoryDto {
	userInitiatorId: string
	userRecipientId: string
	value: number
	type: 'D' | 'W' | 'T'
}