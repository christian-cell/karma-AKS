import { UserInfo } from "./karma/user";
import { UserResponse } from "./karma/userResponse";

  
  export interface AppState {
    User :                           UserInfo,
    Users:                           UserResponse[]
  }