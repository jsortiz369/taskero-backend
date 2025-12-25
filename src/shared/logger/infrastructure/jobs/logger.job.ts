import { Cron, CronExpression } from '@nestjs/schedule';
import * as path from 'path';
import * as fs from 'fs';

export class LoggerJob {
  /**
   * @description It will run every day at midnight
   * @date 2025-12-22 06:55:17
   * @author Jogan Ortiz Muñoz
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  deleteFileLogger() {
    const dateCurrent = new Date();
    const pathFiles = path.join(process.cwd(), 'logs');
    const filesLogs = fs.readdirSync(pathFiles); // TODO: get all files logs

    for (let $i = 0; $i < filesLogs.length; $i++) {
      const fileLog = filesLogs[$i];
      const pathComplete = path.join(pathFiles, fileLog);
      const dataFile = fs.statSync(pathComplete); // TODO: get data file log

      const diffDay = (dateCurrent.getTime() - dataFile.birthtime.getTime()) / (1000 * 3600 * 24); // TODO: get diff day
      if (diffDay > 7) fs.unlinkSync(pathComplete); // TODO: delete file
    }
  }
}
