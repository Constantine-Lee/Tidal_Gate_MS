import { LogLevel } from 'src/app/_models/CONSTANT';

export const environment = {
  production: true,
  apiUrl: 'https://sarawaktidalgates.herokuapp.com/api',
  imageFolderUrl: 'https://tidalgate-ms.s3-ap-southeast-1.amazonaws.com/images/',
  log: LogLevel.Debug
};
