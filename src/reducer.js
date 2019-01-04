
export const reducerDefault = { Food: 'Fish', FootballTeam: 'Arsenal', FooBar: { surname: 'Jones' } };

export function reducer (state, action) {

    /*const pass = process.env.REACT_APP_DB_PASS;
    console.log('PASSWORD','['+pass+']');   // this builds to a fixed string

    const bork = process.env.NODE_ENV;

    if (process.env.NODE_ENV==='development') {
        console.log('DEVELOPMENT',bork);
        console.log(action,state);
    }
    if (process.env.NODE_ENV==='production') {
        console.log('PRODUCTION');
        console.log(action,state);
    }*/

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
