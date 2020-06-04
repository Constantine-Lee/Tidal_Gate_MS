import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  apiUrl: 'https://sarawaktidalgates.herokuapp.com/api',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
