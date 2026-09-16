type LogError = {
  time: Date;
  err: Error;
};

export function LogError(err: any): void {
  const formatError = {
    time: new Date(),
    err: err,
  };
  console.log(formatError);
}
