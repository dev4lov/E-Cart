"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const verify_token_1 = require("../utils/verify-token");
const router = (0, express_1.Router)();
router.get("/", verify_token_1.verifyAdmin, users_controller_1.getAllUsers);
router.post("/verify", verify_token_1.verifyToken, verify_token_1.getUserDetails);
// router.post("/delete", verifyToken, deleteUser);
exports.default = router;
