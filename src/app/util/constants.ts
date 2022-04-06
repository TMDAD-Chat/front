import { environment } from "src/environments/environment";

export class Constants {
  public static readonly sendMessageEndpoint = `${environment.message_push_api}/`;
  public static readonly defaultImage = "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png";
}