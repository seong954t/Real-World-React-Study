import UserVo from "../../Vo/UserVo";

export class User implements UserVo {
    email: string = "";
    token: string = "";
    username: string = "";
    bio: string = "";
    image: string = "";

    constructor(user?: Readonly<UserVo>) {
        if(user){
            this.email = user.email;
            this.token = user.token;
            this.username = user.username;
            this.bio = user.bio;
            this.image = user.image;
        }
    }
}