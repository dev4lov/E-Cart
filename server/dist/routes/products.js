"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const verify_token_1 = require("../utils/verify-token");
exports.router = (0, express_1.Router)();
exports.router.get("/", products_controller_1.getAllProducts);
exports.router.get("/search", products_controller_1.getSearchedProducts);
exports.router.get("/:id", products_controller_1.getProduct);
exports.router.get("/:id/reviews", products_controller_1.getProductReviews);
exports.router.post("/:id/add-review", verify_token_1.verifyToken, products_controller_1.addProductReview);
exports.default = exports.router;
