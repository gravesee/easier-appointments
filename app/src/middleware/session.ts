import sessions from "express-session";
import { Request, Response, NextFunction } from "express";

const oneDay = 1000 * 60 * 60 * 24;
// const oneDay = 10000;

//session middleware
export const sessionMiddleware = sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
});

export const sessionSetLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  req.session.loggedIn = true
  req.session.roles = res.locals.roles;
  console.log(req.session);
  return res.status(200).send({ message: "Successfully logged in" });
}

export const sessionCheckLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.loggedIn) {
      next();
    } else {
    res.redirect("api/auth/signin");
  }
}

export const checkAuthorization = (authorities: string[] = []) => (req: Request, res: Response, next: NextFunction) => {
  if (req.session.loggedIn) {
    const hasAccess = req.session.roles?.some(_ => authorities.includes(_)) || false;
    if (hasAccess || authorities.includes("*")) {
      next();
    } else {
      res.status(403).send();
    }
  } else {
    res.redirect("api/auth/signin");
  }
}