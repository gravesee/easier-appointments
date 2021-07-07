import middleware from "../middleware";
import controller from "../controllers/auth.controller";
import { Request, Response, NextFunction, Application } from "express";

export default (app: Application) => {

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      middleware.verifySignUp.checkDuplicateUsernameOrEmail,
      middleware.verifySignUp.checkRolesExisted,
    ],
    controller.signUp,
    middleware.sessionSetLoggedIn
  );

  app.post("/api/auth/signin",
    middleware.sessionCheckLoggedIn,
    controller.signIn,
    middleware.sessionSetLoggedIn);
};