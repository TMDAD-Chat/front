
export enum MessageType {
  TEXT, FILE
}

export interface MessageInterface {

  id: number;
  messageType: MessageType;
  content: string;
  sender: string;
  creationTimestamp: Date;

}
