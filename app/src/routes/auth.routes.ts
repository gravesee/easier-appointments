import { verifySignUp } from "../middleware";
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
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signUp
  );

  app.post("/api/auth/signin", controller.signIn);
};