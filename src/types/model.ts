import Joi, { Schema, Root } from "joi";

import CustomError, { ValidationError } from "./errors";
import { HTTP_STATUS_CODE } from "./consts";

export type GenericObject = { [key: string]: any };

export default class Model {
  static schema: Object;

  assign(source: GenericObject) {
    this._validateJSONSchema();

    source = this.validate(source);

    for (const key in source) {
      (<any>this)[key] = source[key];
    }
  }

  _validateJSONSchema() {
    const keys = Object.keys((<any>this).constructor["schema"]);

    Object.getOwnPropertyNames(this).forEach((prop) => {
      if (!keys.includes(prop)) {
        throw new MissingSchemaDefinitionError(this.constructor.name, prop);
      }
    });
  }

  _createJOISchema(): Schema {
    const schema: any = {};

    Object.entries((<any>this).constructor["schema"]).forEach(
      ([prop, options]: [string, any]) => {
        if (!(options as any).type) {
          throw new MissingTypeDeclarationError(this.constructor.name, prop);
        }

        schema[prop] = (Joi[options.type as keyof Root] as () => Joi.Schema)();

        Object.keys(options).forEach((option) => {
          if (option !== "type") {
            const value =
              typeof options[option] !== "boolean"
                ? options[option]
                : undefined;
            schema[prop] = schema[prop][option](value);
          }
        });
      }
    );

    return Joi.object(schema);
  }

  validate(source: any) {
    const schema = this._createJOISchema();

    const { value, error } = schema.validate(source);

    if (error) {
      throw new ValidationError(error);
    }

    return value;
  }
}

class MissingSchemaDefinitionError extends CustomError {
  constructor(name: any, prop: any) {
    super(
      `Missing schema definition for ${name}.${prop} `,
      HTTP_STATUS_CODE.INTERNAL
    );
  }
}

class MissingTypeDeclarationError extends CustomError {
  constructor(name: any, prop: any) {
    super(
      `Missing type declaration for ${name}.${prop} `,
      HTTP_STATUS_CODE.INTERNAL
    );
  }
}
