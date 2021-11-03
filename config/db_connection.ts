import mongoose from "mongoose";
import express from 'express'

mongoose
  .connect("mongodb://mongo:27017/type")
  .then(() => {
    console.log("Db connected succesfully");
  })
  .catch((e:express.ErrorRequestHandler) => {
    console.log(e);
  });

module.exports = mongoose;
