import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getConfig } from './common/utils/ymlConfig'
import { ConfigModule } from '@nestjs/config'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { BaseExceptionFilter } from './common/exceptions/base.exception.filter'
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { PrismaController } from './prisma/prisma.controller'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getConfig]
    }),
    PrismaModule
  ],
  controllers: [AppController, PrismaController],
  providers: [
    AppService,
    {
      // 全局拦截器
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter
    },
    {
      // Http异常
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    PrismaService
  ]
})
export class AppModule {}
