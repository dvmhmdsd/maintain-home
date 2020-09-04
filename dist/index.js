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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const controllers_1 = require("./controllers");
const error_handler_helper_1 = require("./helpers/error/error-handler.helper");
const dotenv_1 = __importDefault(require("dotenv"));
class App {
    constructor() {
        this.app = express_1.default();
        this.endpoints = [
            { endpointUrl: "/api/users", controller: controllers_1.userController },
        ];
        dotenv_1.default.config();
        this.setupDbConnection();
        this.init();
    }
    init() {
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
        if (process.env.NODE_ENV === "production") {
            this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
            // always send the index.html file to handle SPA routing
            this.app.get("*", (req, res) => {
                res.sendFile(path_1.default.join(__dirname, "public/index.html"));
            });
        }
        this.registerControllers();
        this.app.use((err, req, res, next) => {
            error_handler_helper_1.handleError(err, res);
        });
        // disable the X-Powered-By header instead of using helmet
        this.app.disable("x-powered-by");
    }
    setupDbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(process.env.DB_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                });
                console.log("Connected to DB");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    registerControllers() {
        this.endpoints.map((endpoint) => this.app.use(endpoint.endpointUrl, endpoint.controller));
    }
    listen() {
        const port = process.env.PORT || 4000;
        this.app.listen(port, () => console.log(`Listening to port ${port}`));
    }
}
const server = new App();
server.listen();
//# sourceMappingURL=index.js.map