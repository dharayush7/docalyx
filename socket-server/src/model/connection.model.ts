export type ConnectionFields = {
  userId: string;
  createdAt: Date;
  sockets: SocketFields[];
};

export type SocketFields = {
  socketId: string;
  userId: string;
  serverId: number;
  status: string;
  route: string;
  chatId?: string | null;
  createdAt?: Date;
};

export class SocketModel implements SocketFields {
  socketId: string;
  serverId: number;
  userId: string;
  status: string;
  route: string;
  chatId?: string | null;
  createdAt: Date;

  constructor(params: SocketFields) {
    this.socketId = params.socketId;
    this.userId = params.userId;
    this.status = params.status;
    this.route = params.route;
    this.chatId = params.chatId;
    this.serverId = params.serverId;
    this.createdAt = params.createdAt ?? new Date();
  }

  toJSON(): SocketFields {
    return {
      userId: this.userId,
      createdAt: this.createdAt,
      route: this.route,
      serverId: this.serverId,
      socketId: this.socketId,
      status: this.status,
      chatId: this.chatId,
    };
  }

  toStringify(): string {
    return JSON.stringify(this.toJSON());
  }

  static fromJSON(json: string): SocketModel {
    const data = JSON.parse(json) as SocketFields;
    return new SocketModel(data);
  }
}

export class ConnectionModel implements ConnectionFields {
  userId: string;
  createdAt: Date;
  sockets: SocketModel[];

  constructor(params: Omit<ConnectionFields, "createdAt">) {
    this.userId = params.userId;
    this.createdAt = new Date();
    this.sockets = [];
    params.sockets.forEach((socket) => {
      this.sockets.push(new SocketModel(socket));
    });
  }

  toJSON(): ConnectionFields {
    return {
      userId: this.userId,
      createdAt: this.createdAt,
      sockets: this.sockets.map((socket) => socket.toJSON()),
    };
  }

  appendSocket(socket: SocketModel) {
    this.sockets.push(socket);
  }

  deleteSocket(socketId: string) {
    this.sockets = this.sockets.filter(
      (socket) => socket.socketId !== socketId
    );
  }

  toStringify(): string {
    return JSON.stringify(this.toJSON());
  }

  static fromJSON(json: string): ConnectionModel {
    const data = JSON.parse(json) as ConnectionFields;
    return new ConnectionModel({
      userId: data.userId,
      sockets: data.sockets.map((socket: any) => new SocketModel(socket)),
    });
  }
}
