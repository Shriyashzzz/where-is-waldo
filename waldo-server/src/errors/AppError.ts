export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
    public showError: boolean = false,
    public customErrorInfo?: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // fixes instanceof checks
    Error.captureStackTrace(this);
  }
}

export class InvalidIndexError extends AppError {
  constructor(index: number) {
    super(`Invalid index value: ${index}`, 400);
  }
}
