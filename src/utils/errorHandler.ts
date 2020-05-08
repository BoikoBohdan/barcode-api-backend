import { map, assoc, compose, values, prop } from "ramda";

export class ErrorHandler {
  static transformMongooseErrors(validationErrors: any) {
    return compose(
      map(prop("message")),
      values,
      prop("errors")
    )(validationErrors);
  }
}
