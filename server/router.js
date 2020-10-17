const express = require("express");

const UserCtrl = require("./control");

const router = express.Router();

router.post("/users", UserCtrl.addUser);
router.get("/users", UserCtrl.getUserList);
router.get("/users/:id", UserCtrl.getUserById);
router.put("/users/:id", UserCtrl.updateUser);
router.delete("/users/:id", UserCtrl.deleteUser);

module.exports = router;
