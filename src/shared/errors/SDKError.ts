export class SDKError extends Error {
  public code: string;
  public details?: unknown;

  constructor(message: string, code = 'SDK_ERROR', details?: unknown) {
    super(message);
    this.name = 'SDKError';
    this.code = code;
    this.details = details;
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if ('captureStackTrace' in Error) {
      (Error as any).captureStackTrace(this, SDKError);
    }
  }
}
