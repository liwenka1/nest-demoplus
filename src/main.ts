import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { generateDocmment } from './doc'
import { getConfig } from './common/utils/ymlConfig'
import { logger } from './common/middleware/logger.middleware'

declare const module: any

async function bootstrap() {
  // 创建实例
  const app = await NestFactory.create(AppModule)
  // 文档支持
  generateDocmment(app)
  // 日志
  app.use(logger)
  // 允许跨域访问的配置
  app.enableCors()
  // 启动项目
  await app.listen(getConfig('HTTP').port)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
