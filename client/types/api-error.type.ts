export type ApiError = {
  status: number;
  message: string[];
  cause: string;
  timestamp: Date;
  path: string;
  method: string;
};

export class ApiHttpException extends Error {
  constructor(
    public status: number,
    public message: string,
    public cause: string,
    public timestamp: Date,
    public path: string,
    public method: string
  ) {
    super(message, { cause });
  }
}
