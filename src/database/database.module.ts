import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Module({
  exports: [databaseProviders],
  imports : [databaseProviders]
})
export class DatabaseModule {}