"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express = require("express");
const helmet = require("helmet");
const server = express();
server.set('trust proxy', 1);
server.disable('etag');
server.use(helmet.xssFilter());
server.use(helmet.noSniff());
server.use(helmet.frameguard());
server.use(helmet.ieNoOpen());
server.use(helmet.hidePoweredBy());
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, server);
        app.useStaticAssets(path_1.join(__dirname, "..", "public"));
        app.setBaseViewsDir(path_1.join(__dirname, "..", "views"));
        app.setViewEngine('hbs');
        yield app.listen(4350);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map