
export enum MessageType {
  TEXT, FILE
}

export interface Message {

  messageType: MessageType;
  content: string;
  sender: string;
  creationTimestamp: Date;

}
