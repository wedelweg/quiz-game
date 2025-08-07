export interface StateInterface {

    user: {
        login: '',
            password: ''
    },
    scores: {
        score: 0,
    }
}
export interface ActionInterface {
    type: string;
    payload: string|number;
}
