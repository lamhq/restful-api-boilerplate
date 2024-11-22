import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let context: INestApplicationContext;

export async function getNestContext(): Promise<INestApplicationContext> {
  if (typeof context === 'undefined') {
    context = await NestFactory.createApplicationContext(AppModule);
  }

  return context;
}

getNestContext().catch(() => {
  console.log('Error while creating Nest Application Context.');
});
