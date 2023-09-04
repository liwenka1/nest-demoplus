import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'
import { CustomException } from './common/exceptions/custom.business'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('测试')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @ApiOperation({
    summary: 'hello'
  })
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @ApiOperation({
    summary: 'err'
  })
  @Get('err')
  getErr() {
    throw new CustomException('自定义异常抛出')
    return this.appService.getHello()
  }
}
