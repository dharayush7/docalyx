type ConnectionFields = {
  socketId: string;
  serverId: number;
  status: string;
  userId: string;
  chatId?: string | null;
  createdAt: Date;
};

class ConnectionModel implements ConnectionFields {
  socketId: string;
  serverId: number;
  status: string;
  userId: string;
  chatId?: string | null;
  createdAt: Date;

  constructor(params: Omit<ConnectionFields, "createdAt">) {
    this.socketId = params.socketId;
    this.serverId = params.serverId;
    this.status = params.status;
    this.userId = params.userId;
    this.chatId = params.chatId;
    this.createdAt = new Date();
  }

  toJSON(): ConnectionFields {
    return {
      socketId: this.socketId,
      serverId: this.serverId,
      status: this.status,
      userId: this.userId,
      chatId: this.chatId,
      createdAt: this.createdAt,
    };
  }

  toStringify(): string {
    return JSON.stringify(this.toJSON());
  }

  static fromJSON(json: string): ConnectionModel {
    const data = JSON.parse(json);
    return new ConnectionModel({
      socketId: data.socketId,
      serverId: data.serverId,
      status: data.status,
      userId: data.userId,
      chatId: data.chatId ?? null,
    });
  }
}
