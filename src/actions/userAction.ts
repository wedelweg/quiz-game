export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_SCORE = 'CHANGE_SCORE'; //TODO

export const changeLogin = (login: string) => ({
    type: CHANGE_LOGIN,
    payload: login,
})