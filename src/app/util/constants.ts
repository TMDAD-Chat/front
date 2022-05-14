import { environment } from "src/environments/environment";

export class Constants {
  public static readonly messagePushApi = `${environment.gateway}/v1/messagepush`;
  public static getEventsEnpoint = (email: string) =>
    `${this.messagePushApi}/user/${email}`;
  public static getRoomEventsEnpoint = (roomId: number, userEmail: string) =>
    `${this.messagePushApi}/room/${roomId}/messages/${userEmail}`;

  //#region messageReceiver endpoints
  public static readonly messageReceiveApi = `${environment.gateway}/v1/messagereceive`;
  public static sendMessageEndpoint = (email: string) =>
    `${this.messageReceiveApi}/user/${email}/message`;
  public static sendFileEndpoint = (email: string) =>
    `${this.messageReceiveApi}/user/${email}/message`;
  public static sendMessageRoomEndpoint = (roomId: number) =>
    `${this.messageReceiveApi}/room/${roomId}/message`;
  public static sendFileRoomEndpoint = (roomId: number) =>
    `${this.messageReceiveApi}/room/${roomId}/file`;
  public static conversationsListEndpoint = (email: string) =>
    `${this.messageReceiveApi}/user/${email}/conversations`;
  public static getoldConversationMessagesEndpoint = (
    loggedUser: string,
    otherUser: string
  ) => `${this.messageReceiveApi}/user/${loggedUser}/conversation/${otherUser}`;
  public static getOldGlobalMessagesEndpoint = (loggedUser: string) =>
    `${this.messageReceiveApi}/user/${loggedUser}/conversation/global/`;
  public static getOldRoomMessagesEndpoint = (roomId: number, email: string) =>
    `${this.messageReceiveApi}/room/${roomId}/conversation/${email}`;
  //#endregion

  public static readonly userApi = `${environment.gateway}/v1/user`;
  public static getOrCreateUserEnpoint = (email: string) =>
    `${this.userApi}/user/${email}`;
  public static getRoomInfoEndpoint = (roomId: number) =>
    `${this.userApi}/room/${roomId}`;

  public static readonly defaultImage =
    'https://therichpost.com/wp-content/uploads/2020/06/avatar2.png';
}
