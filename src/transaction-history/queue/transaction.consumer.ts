import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq"
import { Job } from "bullmq"
import TransactionOperationContext from '../context/transaction-operation.context';
import TransactionDeposit from "../context/transaction-deposit.strategy";
import TransactionOperationStrategy from "../context/transaction-operation.strategy.interface";
import TransactionWithdraw from "../context/transaction-withdraw.strategy";
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";

@Processor('transaction-queue')
export class TransactionConsumer extends WorkerHost {

	constructor(@Inject(DataSource) private dataSource: DataSource) { super() }

	@OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name}...`,
    );
  }

	@OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(
      `Completed job ${job.id} of type ${job.name}.`,
    );
  }

	@OnWorkerEvent('error')
	onError(failedReason: any) {
		console.error(failedReason);
	}

	async process(job: Job): Promise<any> {
		const { userId, value } = job.data
		const strategy = { value: <TransactionOperationStrategy>{}}

		if (job.name === 'deposit') {
			strategy.value = new TransactionDeposit(this.dataSource, userId)
		}

		if (job.name === 'withdraw') {
			strategy.value = new TransactionWithdraw(this.dataSource, userId)
		}

		TransactionOperationContext.setStrategy(strategy.value)
		try {
			await TransactionOperationContext.executeStrategy(value)
		} catch (error) {
			console.error(`Job ${job.id} failed: `, error)
			throw error
		}

		return { success: true }
	}

	
}