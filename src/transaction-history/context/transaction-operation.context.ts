import TransactionOperationStrategy from "./transaction-operation.strategy.interface";

class TransactionOperationContext {
	private strategy: TransactionOperationStrategy

	public setStrategy(strategy: TransactionOperationStrategy) {
		this.strategy = strategy
	}

	public executeStrategy(value: number) {
		return this.strategy.execute(value)
	}
}

export default new TransactionOperationContext