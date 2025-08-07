export interface StateInterface {
    user:{
        login: string,
        password: string,
    },
    scores: {
        score: number,
    }
}

export interface ActionInterface {
    type: string,
    payload: string|number
}