type LogError = {
  time: Date;
  err: Error;
};

export function LogError(err: any): LogError {
  return {
    time: new Date(),
    err: err,
  };
}
