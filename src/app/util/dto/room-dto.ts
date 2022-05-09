import {UserDto} from "./user-dto";

export interface RoomDto {

  id: number;
  name: string;
  owner: UserDto;
  users: UserDto[];

}
