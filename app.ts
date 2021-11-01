import dot_env from 'dotenv'
dot_env.config({path:'./config/.env'})
//import './config/db_connection'
import express from "express";

const app: express.Application = express();

const port: any = process.env.PORT || 5000;

const index_router = require("./src/routes/index_routes");

app.use(express.json())

app.get("/api", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    Message: "Hello from nodejs server",
  });
});

app.use('/api',index_router)

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
