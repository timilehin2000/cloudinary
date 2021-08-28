const router = require("express").Router();
const formData = require("../utils/multer");
const Controller = require("../controllers/user");

router.post("/", formData.single("image"), Controller.createUser);

router.get("/", Controller.getAllUsers);

router.delete("/:id", Controller.deleteUser);

router.put("/:id", formData.single("image"), Controller.updateUser);

module.exports = router;
