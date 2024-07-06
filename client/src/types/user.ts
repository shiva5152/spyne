
export type TUser = {
    _id: string,
    name: string;
    mobile: string;
    email: string;
    password: string;
    following: string[];
    followers: string[];
    discussions: string[];
    createdAt?: Date;
    updatedAt?: Date;
} 