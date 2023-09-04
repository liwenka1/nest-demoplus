import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseIntPipe
} from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('prisma测试')
@Controller('prisma')
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({
    summary: 'GetUser'
  })
  @Get('user')
  async getUser() {
    return await this.prisma.user.findMany()
  }

  @ApiOperation({
    summary: 'GetMenu'
  })
  @Get('menu')
  async GetMenu() {
    return await this.prisma.menu.findMany()
  }

  @ApiOperation({
    summary: 'PostUser'
  })
  @Post('user')
  async createUser(@Body() dto: { username: string; age: number }) {
    return await this.prisma.user.create({
      data: {
        username: dto.username,
        age: +dto.age
      }
    })
  }

  @ApiOperation({
    summary: 'PostMenu'
  })
  @Post('menu')
  async createMenu(@Body() dto: { menuname: string }) {
    return await this.prisma.menu.create({
      data: {
        menuname: dto.menuname
      }
    })
  }

  @ApiOperation({
    summary: 'Patch'
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() dto: { username: string; age: number }
  ) {
    return await this.prisma.user.update({
      where: {
        id: +id
      },
      data: {
        username: dto.username,
        age: +dto.age
      }
    })
  }

  @ApiOperation({
    summary: 'Delete'
  })
  @Delete(':id')
  @UsePipes(ParseIntPipe)
  async deleteUser(@Param('id') id: number) {
    return await this.prisma.user.delete({
      where: {
        id: id
      }
    })
  }
}
