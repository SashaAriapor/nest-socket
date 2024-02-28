import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"
@WebSocketGateway()
export class MyGateway implements OnModuleInit {

    @WebSocketServer()
    server: Server;
     onModuleInit() {
        this.server.on('connection', socket => {
            console.log(socket.id);
            console.log(`connected`);
            
        })
     }

    @SubscribeMessage('events')
    handleEvents(@MessageBody() data: any): void {
        console.log(data);
        this.server.emit('onEvents', {
            contact: data
        })
    }
}