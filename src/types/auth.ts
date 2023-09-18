import Model, { GenericObject } from "./model";

export class LoginPayload extends Model {
  email: string;
  password: string;

  static schema = {
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  };

  constructor(source: unknown) {
    super();

    this.email = "";
    this.password = "";

    this.assign(source as GenericObject);
  }
}

export class RegisterPayload extends Model {
  username: string;
  email: string;
  password: string;

  static schema = {
    username: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  };

  constructor(source: unknown) {
    super();

    this.username = "";
    this.email = "";
    this.password = "";

    this.assign(source as GenericObject);
  }
}
