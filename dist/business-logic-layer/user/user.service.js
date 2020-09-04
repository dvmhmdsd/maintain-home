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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const core_service_1 = __importDefault(require("../core.service"));
const user_model_1 = __importDefault(require("../../data-access-layer/user/user.model"));
const error_handler_helper_1 = require("../../helpers/error/error-handler.helper");
class UserService extends core_service_1.default {
    constructor() {
        super();
        this.initialize(user_model_1.default, "User");
        this.login = this.login.bind(this);
        this.listRecords = this.listRecords.bind(this);
        this.getUserProfileData = this.getUserProfileData.bind(this);
    }
    getUserProfileData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield this._db.findById(id, "name username image type");
                if (!user) {
                    throw new error_handler_helper_1.ErrorHandler(404, "User is not found");
                }
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, name, password, image, type } = req.body;
            this.checkUserExistence(username);
            try {
                const hash = yield this.createHash(password);
                const user = new user_model_1.default({
                    username,
                    name,
                    password: hash,
                    image,
                    type,
                });
                const newRecord = yield this._db.create(user);
                res.json(newRecord.select("name username image type"));
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    checkUserExistence(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._db.find({ username });
                if (user) {
                    throw new error_handler_helper_1.ErrorHandler(400, "The username is already used.");
                }
            }
            catch (error) {
                throw new error_handler_helper_1.ErrorHandler(500, "An error occurred while checking if user exists, please try again.");
            }
        });
    }
    createHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, 10);
        });
    }
    createToken(user) {
        jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_PASSWORD, {
            expiresIn: 86400,
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield this._db.findOne({ username, password }, "name username image type");
                if (!user) {
                    throw new error_handler_helper_1.ErrorHandler(401, "The username or password are incorrect !");
                }
                const token = this.createToken(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res) {
        req.user = null;
        res.json({ success: true });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map