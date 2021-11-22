import express from "express";
import Joi from "joi";

const create_user = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).send({ Error: error.details[0].message });
  } else {
    next();
  }
};

const update_user = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).send({ Error: error.details[0].message });
  } else {
    next();
  }
};
export default {
  create_user,
  update_user,
};
