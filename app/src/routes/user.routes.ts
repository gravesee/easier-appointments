import middleware from "../middleware";
import controller from "../controllers/user.controller";
import { Request, Response, NextFunction, Application } from "express";

export default (app: Application) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/all",
    middleware.checkAuthorization(['*']),
    controller.allAccess);

  app.get(
    "/api/test/user",
    middleware.checkAuthorization(['ROLE_USER']),
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    middleware.checkAuthorization(['ROLE_MODERATOR']),
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    //[middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    middleware.checkAuthorization(['ROLE_ADMIN']),
    controller.adminBoard
  );
};