import { Users } from "./models/Users";
import { Role } from "./models/Role";
 
export const users = [
    new Users(1,'ahmad_hash', 'password','Ahmad', 'Adil','ahmad@toocoolforschool.com', new Role(1,"Admin")),
    new Users(2,'cperry', 'password', 'Charles', 'Perry', 'charles@jsisverycool.com',new Role(2,"Admin")),
    new Users(3,'abatson', 'password', 'Alec','Batson', 'trainer@jsisverycool.com',new Role(3,"User"))
]