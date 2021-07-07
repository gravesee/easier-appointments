import { Role } from "../db/models";
import { User } from "../db/models";

import { Op } from "sequelize";

import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { noExtendLeft } from "sequelize/types/lib/operators";


const signUp = async (req: Request, res: Response, next: NextFunction) => {
  // Save User to Database

  try {
    // create the user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    // if request has roles, set all the ones that 
    let roles: (Role | number)[];
    if (req.body.roles) {
      roles = await Role.findAll({
        where: {
          name: { [Op.or]: req.body.roles }
        }
      });
      if (!roles) roles = [1];
    } else {
      roles = [1];
    }

    await user.setRoles(roles);
    
    const authorities = (await user.getRoles()).map(_ => `ROLE_${_.name.toUpperCase()}`) || [];
    res.locals.roles = authorities;
    
    //return res.status(200).send({ message: user });
    next();

  } catch (err) {
    res.status(500).send({ message: err });
  }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const user = await User.findOne({
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

    const roles = (await user.getRoles()).map(_ => `ROLE_${_.name.toUpperCase()}`) || [];
    res.locals.roles = roles;


    next();

  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err }); 
  }
}

export default { signIn, signUp }; 