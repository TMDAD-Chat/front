export interface ContactInterface {
  name: string;
  email: string;
  photo: string;
  status?: "online" | "offline";
}