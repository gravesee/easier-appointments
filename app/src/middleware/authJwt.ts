//@ts-ignore
import jwt from "jsonwebtoken";
import { secret } from "../config/auth.config.js";
import { db } from "../models";

import { Request, Response, NextFunction } from "express";
// import { Role } from "../models/role.model.js";
// import { Role } from "../models/user.role.model.js";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessHeader = req.headers["x-access-token"];
  const token = Array.isArray(accessHeader) ? accessHeader[0] : accessHeader;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      return res.status(400).send({
        message: "Problem decoding JWT!"
      })
    }
  });
};


const hasRoles = (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await db.user.findByPk(req.userId);

    if (user) {
      const userRoles = (await user.getRoles()).map(role => role.name);
      const passes = userRoles.some(userRole => roles.includes(userRole));

      if (passes) {
        next();
        return;
      } else {
        res.status(403).send({
          message: `Requires ${roles} Role!`
        });
        return;
      }
    }
  } catch (err) {
    console.log(err);
    return;
  }
}

export const isAdmin = hasRoles(["admin"]);
export const isModerator = hasRoles(["moderator"]);
export const isModeratorOrAdmin = hasRoles(["admin", "moderator"]);


export const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};