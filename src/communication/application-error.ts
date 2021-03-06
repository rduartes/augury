import {SerializeableError} from '../utils/error-handling';

export enum ApplicationErrorType {
  None,

  // The application being debugged is running in production mode and therefore
  // is incompatible with Augury and cannot be debugged.
  ProductionMode,

  // The application being debugged in not an Angular App.
  NotNgApp,

  // An uncaught exception prevents the application from being debugged
  UncaughtException,
}

export interface ApplicationError {

  /// The class of error being represented
  errorType: ApplicationErrorType;

  /// The class of error being represented
  error?: SerializeableError;

  /// Additional details about the error
  details: string;

  /// Stack trace information
  stackTrace: string;
}

export class ApplicationError implements ApplicationError {
  constructor(errorType: ApplicationErrorType, error?: SerializeableError, details?: string, stack?: string) {
    this.errorType = errorType;
    this.error = error;
    this.details = details || error ? error.message : null;
    this.stackTrace = stack || error ? error.stack : new Error().stack;
  }
}
