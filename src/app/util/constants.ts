import { environment } from "src/environments/environment";

export class Constants {
  public static readonly messagePushApi = `${environment.gateway}/v1/messagepush`;
  public static readonly getEventsEnpoint = (email: string) =>
    `${this.messagePushApi}/user/${email}`;

  //#region messageReceiver endpoints
  public static readonly messageReceiveApi = `${environment.gateway}/v1/messagereceive`;
  public static sendMessageEndpoint = (email: string) =>
    `${this.messageReceiveApi}/user/${email}/message`;
  public static sendFileEndpoint = (email: string) =>
    `${this.messageReceiveApi}/user/${email}/message`;
  public static conversationsListEndpoint = (email: string) =>
    `${this.messageReceiveApi}/user/${email}/conversations`;
  public static getoldConversationMessagesEndpoint = (
    loggedUser: string,
    otherUser: string
  ) => `${this.messageReceiveApi}/user/${loggedUser}/conversation/${otherUser}`;
  public static getOldGlobalMessagesEndpoint = (loggedUser: string) =>
    `${this.messageReceiveApi}/user/${loggedUser}/conversation/global/`;
  //#endregion

  public static readonly userApi = `${environment.gateway}/v1/user`;
  public static getOrCreateUserEnpoint = (email: string) =>
    `${this.userApi}/user/${email}`;

  public static readonly defaultImage =
    'https://therichpost.com/wp-content/uploads/2020/06/avatar2.png';
}
