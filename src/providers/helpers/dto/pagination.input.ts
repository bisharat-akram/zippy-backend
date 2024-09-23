import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationInput {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  pageNumber: number;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  perPage: number;
}
