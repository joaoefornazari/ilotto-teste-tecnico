import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { TransactionReport } from "../transaction-report.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Processor('transaction-history-queue')
export class TransactionReportConsumer extends WorkerHost {

	constructor(
		@InjectRepository(TransactionReport)
		private transactionReportRepository: Repository<TransactionReport>
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

	async process(job: Job<{ date: string, type: 'D' | 'W' | 'T'}, any, string>): Promise<any> {
		const { date, type } = job.data

		try {
			const transactionReport = await this.transactionReportRepository.findOne({
				where: { date: date } 
			})
			if (!transactionReport) {
				const todayReport = new TransactionReport()
				todayReport.date = date
				todayReport.deposits = type === 'D' ? 1 : 0
				todayReport.withdraws = type === 'W' ? 1 : 0
				todayReport.transferences = type === 'T' ? 1 : 0
				this.transactionReportRepository.save(todayReport)
	
			} else {
				switch (type) {
					case 'D':
						await this.transactionReportRepository.update(transactionReport.id, { deposits: () => 'deposits + 1' })
						break;
					case 'W':
						await this.transactionReportRepository.update(transactionReport.id, { withdraws: () => 'withdraws + 1' })
						break;
					case 'T':
						await this.transactionReportRepository.update(transactionReport.id, { transferences: () => 'transferences + 1' })
						break;
				}
			}
		} catch (error) {
			console.error(`Job ${job.id} failed: `, error)
			throw error
		}

		return { success: true };
	}
}
