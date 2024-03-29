import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isSIRET } from 'siret';

// eslint-disable-next-line @typescript-eslint/tslint/config
export function IsSiret(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'IsSiret',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: number, _args: ValidationArguments) {
          return isSIRET(value.toString());
        },
      },
    });
  };
}
