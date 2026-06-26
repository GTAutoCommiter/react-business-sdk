import { SDKError } from './SDKError';

export class HttpError extends SDKError {
  public statusCode: number;

  constructor(message: string, statusCode: number, code = 'HTTP_ERROR', details?: unknown) {
    super(message, code, details);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}
