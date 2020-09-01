import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogLevel } from '../_models/CONSTANT';


@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }
  level: LogLevel = environment.log ;  
  
  private shouldLog(level: LogLevel): boolean {   
    if ((level >= this.level &&
      level !== LogLevel.Off) ) {
      return true;
    }
    else return false;    
  }

  debug(message: string) {
    if(this.shouldLog(LogLevel.Debug)){
      let logEntry = this.createLogStatement('debug', message)
      console.info(logEntry);      
    }

  }

  error(message: string) {
    if(this.shouldLog(LogLevel.Error)){
      let logEntry = this.createLogStatement('error', message)
      console.error(logEntry);      
    }
  }

  warn(message: string) {
    if(this.shouldLog(LogLevel.Warn)){
      let logEntry = this.createLogStatement('warning', message)
      console.warn(logEntry);      
    }
  }

  info(message: string) {
    if(this.shouldLog(LogLevel.Info)){
      let logEntry = this.createLogStatement('info', message)
      console.info(logEntry);
    }
  }

  createLogStatement(level, message) {
    let SEPARATOR = " ";
    let date = this.getCurrentDate();
    return "[" + level + "]" + SEPARATOR + date + SEPARATOR + message;
  }

  getCurrentDate() {
    let now = new Date();
    return "[" + now.toLocaleString() + "]";
  }
}
