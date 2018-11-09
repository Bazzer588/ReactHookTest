
export const reducerDefault = { Food: 'Fish', FootballTeam: 'Arsenal' };

export function reducer (state, action) {
    //console.log(action,state);
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                [action.name]: action.value
            };
        case 'RESTART':
            return reducerDefault;
        default:
            return state;
    }
}
