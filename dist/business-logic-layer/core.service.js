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
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_helper_1 = require("../helpers/error/error-handler.helper");
class CoreService {
    constructor() {
        this.initialize = this.initialize.bind(this);
        this.listRecords = this.listRecords.bind(this);
        this.createRecord = this.createRecord.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }
    initialize(Model, name) {
        this.db = Model;
        this.name = name;
    }
    listRecords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let records = yield this.db.find({});
                res.json(records);
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    createRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newRecord = yield this.db.create(Object.assign({}, req.body));
                res.json(newRecord);
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                let updatedRecord = yield this.db.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true });
                if (!updatedRecord) {
                    throw new error_handler_helper_1.ErrorHandler(404, "The Item you want to update is not found");
                }
                res.json(updatedRecord);
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                let bookToBeDeleted = yield this.db.findByIdAndRemove(id);
                if (!bookToBeDeleted) {
                    throw new error_handler_helper_1.ErrorHandler(404, "The Item you want to delete is not found");
                }
                res.json({
                    msg: `${this.name} has been deleted successfully!`,
                });
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CoreService;
//# sourceMappingURL=core.service.js.map