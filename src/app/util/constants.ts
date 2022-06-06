import { environment } from "src/environments/environment";

export class Constants {
  public static readonly messagePushApi = `${environment.gateway}/v1/messagepush`;
  public static getEventsEnpoint = (email: string) =>
    `${this.messagePushApi}/user/${email}`;
  public static getRoomEventsEnpoint = (roomId: number, userEmail: string) =>
    `${this.messagePushApi}/room/${roomId}/messages`;

  //#region messageReceiver endpoints
  public static readonly messageReceiveApi = `${environment.gateway}/v1/messagereceive`;
  public static sendMessageEndpoint = (email: string) =>
    `${this.messageReceiveApi}/user/${email}/message`;
  public static sendFileEndpoint = (email: string) =>
    `${this.messageReceiveApi}/user/${email}/file`;
  public static sendMessageRoomEndpoint = (roomId: number) =>
    `${this.messageReceiveApi}/room/${roomId}/message`;
  public static sendFileRoomEndpoint = (roomId: number) =>
    `${this.messageReceiveApi}/room/${roomId}/file`;
  public static getoldConversationMessagesEndpoint = (
    loggedUser: string,
    otherUser: string
  ) => `${this.messageReceiveApi}/user/${loggedUser}/conversation/${otherUser}`;
  public static getOldGlobalMessagesEndpoint = (loggedUser: string) =>
    `${this.messageReceiveApi}/user/${loggedUser}/conversation/global/`;
  public static getOldRoomMessagesEndpoint = (roomId: number, email: string) =>
    `${this.messageReceiveApi}/room/${roomId}/conversation`;
  //#endregion

  //#region userApi
  public static readonly userApi = `${environment.gateway}/v1/user`;
  public static getOrCreateUserEnpoint = (email: string) =>
    `${this.userApi}/user/${email}`;
  public static createRoomEndpoint = (email: string) =>
    `${this.userApi}/room`;
  public static getRoomInfoEndpoint = (roomId: number) =>
    `${this.userApi}/room/${roomId}`;
  public static addContactEndpoint = (email: string, contactEmail: string) =>
    `${this.userApi}/user/${email}/contacts/${contactEmail}`;
  public static conversationsListEndpoint = (email: string) =>
    `${this.userApi}/user/${email}/contacts`;
  public static addUserToRoomEndpoint = (roomId: number, userEmail: string) =>
    `${this.userApi}/room/${roomId}/user/${userEmail}`;
  public static getRoomListEndpoint = (email: string) =>
    `${this.userApi}/room/list`;
  //#endregion

  public static readonly defaultImage =
    'https://therichpost.com/wp-content/uploads/2020/06/avatar2.png';
}
