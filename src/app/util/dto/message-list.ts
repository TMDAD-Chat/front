import {MessageInterface} from "./message";

export enum RecipientType {
  USER, ROOM, GLOBAL
}

export interface MessageList {

  requestId: string;
  recipient: string;
  recipientType: RecipientType;
  messages: MessageInterface[];
}
