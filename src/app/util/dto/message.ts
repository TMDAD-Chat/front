
export enum MessageType {
  TEXT, FILE
}

export interface MessageInterface {

  messageType: MessageType;
  content: string;
  sender: string;
  creationTimestamp: Date;

}
