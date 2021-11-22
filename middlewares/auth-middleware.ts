import { verify } from "jsonwebtoken";
import express from "express";

async function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let token: any = req?.header("authorization")?.split(" ")[1];

  if (!token) {
    return res.status(422).send({ message: "Token not found" });
  }
  const secret = <any>process.env.ACCESS_TOKEN;
  try {
    const decoded: any = await verify(token, secret);

    if (!decoded) {
      return res.status(422).send({ message: "Invalid token" });
    }

    (<any>req).user = decoded;

    next();
  } catch (e) {
    return res.status(500).send({ error: e });
  }
}

export default auth;
