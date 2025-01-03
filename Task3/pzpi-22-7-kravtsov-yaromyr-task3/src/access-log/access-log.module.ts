import { Module } from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { AccessLogController } from './access-log.controller';

@Module({
  providers: [AccessLogService],
  controllers: [AccessLogController]
})
export class AccessLogModule {}
