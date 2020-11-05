"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.io = exports.ultimo = void 0;
const environment_1 = require("./global/environment");
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("./sockets/socket"));
const { Pool } = require('pg');
console.log('hola');
class Server {
    constructor() {
        this.config = {
            user: 'postgres',
            host: 'localhost',
            password: 'Magalo33@88230510',
            database: 'vbys_tablets_24082020',
            port: 5550
        };
        this.pool = new Pool(this.config);
        this.monitorearPostgres = () => __awaiter(this, void 0, void 0, function* () {
            console.log('Monitoreando la base de datos');
            try {
                this.pool.connect((err, client, done) => {
                    if (err)
                        throw err;
                    client.on('notification', function (msg) {
                        console.log(msg);
                        exports.ultimo = msg.payload;
                        console.log('Payload------------->' + exports.ultimo);
                        exports.io.emit('mensaje-nuevo', exports.ultimo);
                    });
                    var query = client.query("LISTEN abonando");
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        exports.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
        this.monitorearPostgres();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
        console.log('escuchando sockets');
        exports.io.on('connection', cliente => {
            console.log('Cliente conectado.....');
            //mensajes
            socket.mensaje(cliente, exports.io);
            //desconectar
            socket.desconectar(cliente);
        });
    }
    start(callback) {
        this.httpServer.listen(this.port);
    }
}
exports.default = Server;
