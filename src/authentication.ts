import { ServiceAddons } from "@feathersjs/feathers";
import {
  AuthenticationBaseStrategy,
  AuthenticationResult,
  AuthenticationService,
  JWTStrategy,
} from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import { expressOauth } from "@feathersjs/authentication-oauth";

import { Application } from "./declarations";
import { NotAuthenticated } from "@feathersjs/errors";

declare module "./declarations" {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  class ApiKeyStrategy extends AuthenticationBaseStrategy {
    async authenticate(
      authentication_result: AuthenticationResult,
      params: any
    ) {
      const token = params?.headers?.["x-access-token"];

      const config = this.authentication?.configuration?.apiKey;

      const match = config.allowedKeys.includes(token);
      if (!match) throw new NotAuthenticated("Incorrect API Key");

      return {
        apiKey: true,
        user: {
          permissions: ["admin"],
        },
      };
    }
  }

  const authentication = new AuthenticationService(app);
  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());
  authentication.register("apiKey", new ApiKeyStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
}
