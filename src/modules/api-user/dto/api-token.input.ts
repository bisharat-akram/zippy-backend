import { IsUUID } from 'class-validator';
import { ApiKeyValidator } from '@modules/api-user/decorators/api-key.validator';

export class ApiTokenInput {
  @ApiKeyValidator()
  @IsUUID(4, { each: true })
  clientId: string;

  @IsUUID(4, { each: true })
  clientSecret: string;

  @IsUUID(4, { each: true })
  userId: string;
}
