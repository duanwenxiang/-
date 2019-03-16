var express = require('express');
var router = express.Router();
const register = require("../controller/user");

router.post('/register',register.register);
router.post("/login",register.login);

module.exports = router;