import { appConfig } from '@/config';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.model';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';


export class SocketService {
  protected m_channel: UserChannel;
  protected m_user: User;
  protected m_mainEngine: SocketEngine;

  constructor(user: User, mainEngine: SocketEngine) {
    this.m_user = user;
    this.m_mainEngine = mainEngine;
  }

  public get user(): User {
    return this.m_user;
  }

  public async init(uiSocket: UISocket) {
    this.m_channel = new UserChannel(this, uiSocket);
  }

  public get userChannel(): UserChannel {
    return this.m_channel;
  }

  public onChannelAdded(socket: Socket, nChannels: number) {
    console.log('connected to user : ', `${this.user.email}:`, `${nChannels} channels`);
  }

  public onChannelRemoved(socket: Socket, nChannels: number) {
    console.log('\x1b[31mdisconnected from', `${this.user.email}:`, `${nChannels} channels`, '...\x1b[0m');
    this.m_mainEngine.removeUserChannel(this.user);
  }
}


export class UserChannel {
  public get roomId() {
    return `room_${this.m_socketService.user._id}`;
  }

  protected m_uiSocket: UISocket;

  protected m_socketService: SocketService;
  constructor(emulator: SocketService, uiSocket: UISocket) {
    this.m_socketService = emulator;
    this.m_uiSocket = uiSocket;
  }

  public emit(topic: string, data: any) {
    this.m_uiSocket.io.to(this.roomId).volatile.compress(true).emit(topic, data);
  }

  public addSocket(socket: Socket) {
    socket.join(this.roomId);

    socket.emit("my_message", "This is my message");
    socket.on('disconnect', () => this.m_socketService.onChannelRemoved(socket, socket.rooms.size));
    this.m_socketService.onChannelAdded(socket, socket.rooms.size);
  }

  public async getAllConnected(): Promise<number> {
    const sockets = await this.m_uiSocket.io.in(this.roomId).fetchSockets();
    return sockets.length;
  }
}


export abstract class SocketEngine {

  protected m_mapUserIdToSocket: Record<string, SocketService> = {};

  public async getNewSocketServiceInstance(user: User, uiSocket: UISocket) {
    const newEmulator = new SocketService(user, this);
    await newEmulator.init(uiSocket);
    return newEmulator;
  }

  public async addUserChannel(user: User, socket: Socket, uiSocket: UISocket) {
    if (!this.m_mapUserIdToSocket[user._id]) {
      this.m_mapUserIdToSocket[user._id] = await this.getNewSocketServiceInstance(user, uiSocket);
    }

    const emulator = this.m_mapUserIdToSocket[user._id];
    if (emulator && emulator.userChannel) {
      emulator.userChannel.addSocket(socket);
    }
  }

  public getUserChannel(userId: string): UserChannel | null {
    const emulator = this.m_mapUserIdToSocket[userId];
    if (emulator) {
      return emulator.userChannel;
    }
    return null;
  }

  public removeUserChannel(user: User) {
    if (this.m_mapUserIdToSocket[user._id]) {
      delete this.m_mapUserIdToSocket[user._id];
    }
  }
}


export abstract class UISocket {
  protected m_mainEngine: SocketEngine;
  protected httpServer = createServer();
  protected m_io = new Server(this.httpServer, { cors: { origin: '*' } });

  constructor(mainEngine: SocketEngine) {
    this.m_mainEngine = mainEngine;
  }

  public init(port: number) {
    this.m_io
      .use((socket, next) => this.procForSocket(socket, next))
      .on('connection', async (socket: Socket) => {
        if (socket.handshake.query && socket.handshake.query.token) {
          const token = socket.handshake.query.token.toString();
          const jwtPayload = jwt.verify(token, appConfig.SECRET_KEY as string) as DataStoredInToken;
          await this.procForConnected(jwtPayload, socket);
        }
      });

    this.m_io.on('disconnect', socket => {
      console.log('disconnect on io');
    });

    this.httpServer.listen(port);
  }

  public get io(): Server {
    return this.m_io;
  }

  public async procForSocket(socket: Socket, next: Function) {
    if (socket.handshake.query && socket.handshake.query.token) {
      const token = socket.handshake.query.token.toString();
      try {
        jwt.verify(token, appConfig.SECRET_KEY as string) as DataStoredInToken;
        return next();
      } catch (err: any) {
        console.log('Token validation error, ', err.toString());
        socket.emit('logout');
        socket.disconnect();
        return next(err);
      }
    } else {
      console.log('sending logout : ', socket.id);
      socket.emit('logout');
      socket.disconnect();
      next();
    }
  }

  public async procForConnected(JwtPayload: DataStoredInToken, socket: Socket): Promise<User | null> {
   
    const user: User = await UserModel.findOne({ _id: JwtPayload._id });
    if (user) {
      const channelAdded = this.m_mainEngine.getUserChannel(user._id);
      if (channelAdded) {
        console.log('adding channel...', user.email);
        channelAdded.addSocket(socket);
      } else {
        console.log('creating channel...', user.email);
        this.m_mainEngine.addUserChannel(user, socket, this);
      }      
    }

    return user;
  }
}
