export class UserDto {
    constructor(u: string, e: string) {
        this.username = u;
        this.email = e
    }
    readonly username: string;
    readonly email: string;
}