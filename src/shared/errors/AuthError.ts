import { SDKError } from './SDKError';

export class AuthError extends SDKError {
  constructor(message: string, code = 'AUTH_ERROR', details?: unknown) {
    super(message, code, details);
    this.name = 'AuthError';
  }
}
