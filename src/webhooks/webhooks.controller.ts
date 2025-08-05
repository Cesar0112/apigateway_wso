import { Body, Controller, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly service: WebhooksService) {}
  @Post('scopes')
  updateMap(@Body() payload: any) {}
}
