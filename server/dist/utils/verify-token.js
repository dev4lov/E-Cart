"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const success_1 = require("./success");
const db_1 = require("../db/db");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.body.token) !== null && _a !== void 0 ? _a : "";
    if (!token) {
        return next((0, error_1.CreateError)(401, "You are not authenticated!"));
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next((0, error_1.CreateError)(403, "Token is not valid!"));
        }
        else {
            user.is_admin = user.email === process.env.ADMIN_ID;
            req.body.user = user;
        }
        next();
    });
});
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.verifyToken)(req, res, () => {
        var _a, _b;
        if (((_a = req.body.user) === null || _a === void 0 ? void 0 : _a.email) === req.params.email || ((_b = req.body.user) === null || _b === void 0 ? void 0 : _b.is_admin)) {
            next();
        }
        else {
            return next((0, error_1.CreateError)(403, "You are not authenticated!"));
        }
    });
});
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.verifyToken)(req, res, () => {
        var _a;
        if ((_a = req.body.user) === null || _a === void 0 ? void 0 : _a.is_admin) {
            next();
        }
        else {
            return next((0, error_1.CreateError)(403, "You are not authenticated!"));
        }
    });
});
exports.verifyAdmin = verifyAdmin;
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const userDeatils = (yield db_1.db.query(`SELECT     
        first_name as firstName, 
        last_name as lastName, 
        email, profile_img as imageUrl
        FROM users
        WHERE email = '${user.email}'
    `)).rows[0];
        userDeatils.isAdmin = user.email === process.env.ADMIN_ID;
        return next((0, success_1.CreateSuccess)(200, "Authentication Success", { user: userDeatils }));
    }
    catch (error) {
        return next((0, error_1.CreateError)(500, "Something went wrong"));
    }
});
exports.getUserDetails = getUserDetails;
