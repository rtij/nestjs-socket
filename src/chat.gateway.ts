import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, } from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket,Server } from 'socket.io';

const options = {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
  }
}
@WebSocketGateway(options)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io:Server;
  
  @WebSocketServer()
  server;

  afterInit() {
    this.logger.log("Initialized");
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }


  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void { 
    console.log(message);
    this.server.emit('message', message);
  }
}