import { Length, IsAlphanumeric } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class NewApiUserInput {
  @IsAlphanumeric()
  @Length(2, 50)
  @Transform(
    ({ value }: TransformFnParams) =>
      value
        ?.trim()
        .toLowerCase()
        .trim()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' '),
  )
  name: string;
}
