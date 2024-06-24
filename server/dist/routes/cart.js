"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const verify_token_1 = require("../utils/verify-token");
const router = (0, express_1.Router)();
router.post("/", verify_token_1.verifyToken, cart_controller_1.getAllCartItems);
router.post("/create", verify_token_1.verifyToken, cart_controller_1.createCartItem);
router.post("/update", verify_token_1.verifyToken, cart_controller_1.updateCartItem);
router.post("/del", verify_token_1.verifyToken, cart_controller_1.deleteCartItem);
router.post("/select", verify_token_1.verifyToken, cart_controller_1.selectAllCartItems);
exports.default = router;
