import { db } from "../models";
import { secret } from "../config/auth.config";

import { Op } from "sequelize";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import sequelize from "../config/db.config";
import { Role } from "../models/user.role.model";


const signUp = async (req: Request, res: Response) => {
  // Save User to Database

  try {
    // create the user
    const user = await db.user.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    console.log("========== User Roles:", user.roles);

    // if request has roles, set all the ones that 
    let roles: (Role | number)[];
    if (req.body.roles) {
      roles = await db.role.findAll({
        where: {
          name: { [Op.or]: req.body.roles }
        }
      });
      if (!roles) roles = [1];
    } else {
      roles = [1];
    }

    await user.setRoles(roles);
    return res.status(200).send({ message: user });

  } catch (err) {
    res.status(500).send({ message: err });
  }
}

const signIn = async (req: Request, res: Response) => {

  try {
    const user = await db.user.findOne({
      where: { username: req.body.username }
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password, user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      })
    }

    // 24 hours
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });

    const authorities = user.roles?.map(_ => `ROLE_${_.name}`) || [];

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });

  } catch (err) {
    res.status(500).send({ message: err });
  }
}

export default { signIn, signUp };