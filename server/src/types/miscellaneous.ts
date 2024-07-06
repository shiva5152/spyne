
export type TUserQuery = {
    name?: {
        $regex: any;
        $options: string;
    };
}

export type THashtagQuery = {
    hashtags?: { $in: string[] };
    text?: { $regex: any; $options: string };
    $and?: { hashtags: { $in: [string] } }[];
}