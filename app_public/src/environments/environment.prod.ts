import { NgxLoggerLevel } from 'ngx-logger';
import { LogLevel } from 'src/app/_services/logging.service';

export const environment = {
  production: true,
  apiUrl: 'https://sarawaktidalgates.herokuapp.com/api',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  log: LogLevel.Debug
};
