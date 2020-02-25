import { Users } from "../models/Users";
import { Role } from "../models/Role";

export function UserDtoToUser(UserDtoToUser):Users{
    return new Users(
        UserDtoToUser.user_id,
        UserDtoToUser.username, 
        UserDtoToUser.password,
        UserDtoToUser.first_name,
        UserDtoToUser.last_name,
        UserDtoToUser.email,
        new Role(UserDtoToUser.role_id, UserDtoToUser.role)
)}