export interface UserStateInterface {
    id: string;
    user: UserInfo
}

export interface UserInfo {
    login: string,
    password: string,
}

export interface ScoreStateInterface {
    scores: {
        score: number
    }
}
