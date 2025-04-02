import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(statusCode: number, title: string, message: string) {
    super(
      {
        title,
        message,
      },
      statusCode,
    );
  }
}
