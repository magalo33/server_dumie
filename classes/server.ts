import { SERVER_PORT } from './global/environment';
import express from 'express';
import soccketIO from 'socket.io'
import http from 'http';
import *as socket from './sockets/socket'


const { Pool } = require('pg')
console.log('hola')
export var ultimo:string;
export var io: SocketIO.Server;

export default class Server{
    private static _instance: Server;
     public app: express.Application;
     public port:number;
     
     private httpServer: http.Server;


    
     private constructor(){
         this.app = express();
         this.port = SERVER_PORT;
         this.httpServer= new http.Server(this.app);
         io = soccketIO(this.httpServer);
         this.escucharSockets();
         this.monitorearPostgres();
    
     }

     public static get instance()
     {
         return this._instance || ( this._instance = new this() );
     }
    
     private escucharSockets(){
        console.log('escuchando sockets');
        io.on('connection',cliente => {
            console.log('Cliente conectado.....');

            //mensajes
            socket.mensaje(cliente,io);


            //desconectar
            socket.desconectar(cliente);
        });
     }
    
     start( callback: Function ){
        this.httpServer.listen( this.port);
     }

  



     config={
        user:'postgres',
        host:'localhost',
        password:'Magalo33@88230510',
        database:'vbys_tablets_24082020',
        port:5550
    }
    
    pool=new Pool(this.config);
    
    monitorearPostgres = async () => {
        console.log('Monitoreando la base de datos');
        try{
            this.pool.connect((err: any, client: any, done: any) => {
                if (err) throw err
                client.on('notification', function(msg: any) {
                    console.log(msg);
                    ultimo=msg.payload;
                    console.log('Payload------------->'+ultimo);
                    io.emit('mensaje-nuevo',ultimo);
                  });
                  var query = client.query("LISTEN abonando");
              })
        }
        catch(e)
        {
            console.log(e);
        }   
    }
    



}