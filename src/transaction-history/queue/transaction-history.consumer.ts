import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { TransactionHistory } from "../transaction-history.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Processor('transaction-history-queue')
export class TransactionHistoryConsumer extends WorkerHost {

	constructor(
		@InjectRepository(TransactionHistory)
		private transactionRepository: Repository<TransactionHistory>
	) {
		super()
	}

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
		const payload = job.data

		try {
			const transaction = new TransactionHistory()
			transaction.type = payload.type
			transaction.userInitiatorId = payload.userInitiatorId
			transaction.userRecipientId = payload.userRecipientId
			transaction.value = payload.value
			
			await this.transactionRepository.save(transaction)
		} catch (error) {
			console.error(`Job ${job.id} failed: `, error)
			throw error
		}
		return { success: true };
	}
}
