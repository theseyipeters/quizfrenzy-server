import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get(`/`)
  getHello(): string {
    return 'Welcome to the Quiz Game API!';
  }

  @Get('/health')
  checkHealth(): string {
    return 'API is healthy!';
  }
}
