import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
// import { JwtGuard } from '@modules/auth/guards';
import { CurrentUser } from '@modules/user/decorators';
import { User } from '@common/generated/client';
import { NewApiUserInput } from '@modules/api-user/dto';
import { ApiUserService } from '@modules/api-user/services';
import { ApiTokenInput } from '@modules/api-user/dto/api-token.input';
import { UserContextInterceptor } from '@modules/user/interceptors/UserContextInterceptor';
import { PaginationInput } from '@providers/helpers/dto/pagination.input';

@Controller('api-user')
// @UseGuards(JwtGuard)
export class ApiUserController {
  constructor(private readonly apiUserService: ApiUserService) {}

  // @Post('/add')
  // public async addApiUser(
  //   @CurrentUser() user: User,
  //   @Body() data: NewApiUserInput,
  // ): Promise<null> {
  //   return this.apiUserService.addMember(user['user'].id, data);
  // }

  // @Get('/list/:pageNumber/:perPage')
  // public async listApiUsers(
  //   @CurrentUser() user: User,
  //   @Param() params: PaginationInput,
  // ): Promise<Partial<User[]>> {
  //   return this.apiUserService.listApiUsers(user['user'].id, params);
  // }

  // @Post('/generate-token')
  // @UseInterceptors(new UserContextInterceptor('body'))
  // public async generateToken(
  //   @CurrentUser() user: User,
  //   @Body() data: ApiTokenInput,
  // ): Promise<string> {
  //   return this.apiUserService.generateToken(data);
  // }
}
