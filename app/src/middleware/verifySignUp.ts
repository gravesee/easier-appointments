import { db } from "../models";
import { Request, Response, NextFunction } from "express";

const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await db.user.findOne({
      where: {
        username: req.body.username
      }
    });
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return; 
    }
  } catch (err) {
    console.log(err);
  }

  try {
    let user = await db.user.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
  } catch (err) {
    console.log(err);
  }

  next();
};


const checkRolesExisted = async (req: Request, res: Response, next: NextFunction) => {
  const roles = req.body.roles; // assign to variable fro typescript
  if (Array.isArray(roles)) {

    const validRoles = roles.every(role => db.ROLES.includes(role));

    if (!validRoles) {
      res.status(400).send({
        message: `Failed! Some roles do not exist: ${roles}`
      });
    }
  } else {
    //req.body.roles = ["user"];
    
  };
  next();
}

export const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}