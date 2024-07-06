

export type TDiscussion = {
    _id: string,
    text: string;
    image: string;
    hashtags: string[];
    userId: string;
    likes: string[];
    comments: any[];
    createdAt?: Date;
    updatedAt?: Date;
}