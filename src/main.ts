import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('iLotto Teste Técnico - API')
		.setDescription('Documentação da API desenvolvida para o teste técnico da iLotto.')
		.setVersion('1.0')
		.addTag('ilotto')
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
