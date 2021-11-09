import mongoose from "mongoose";
import express from "express";
const url: any = process.env.DB_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Db connected succesfully");
  })
  .catch((e: express.ErrorRequestHandler) => {
    console.log(e);
  });

module.exports = mongoose;
