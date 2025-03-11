export default interface TransactionOperationStrategy {
	execute(value: number): Promise<void>
}

