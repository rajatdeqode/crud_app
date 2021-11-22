import express from "express";
const router: express.Router = express.Router();
import validator from "../validators/user/index";
import auth_middleware from "../../middlewares/auth-middleware";
const user_controller = require("../controller/user_controller");

router.get("/get", user_controller.get_users);

router.post("/post", validator.create_user, user_controller.add_user);

router.put("/update/:id", [validator.update_user,auth_middleware], user_controller.update_user);

router.delete("/delete/:id", user_controller.delete_user);

module.exports = router;
