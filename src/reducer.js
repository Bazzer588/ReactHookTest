
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

const Handlers = {};

export function setHandler (key, fn) {
    Handlers[key] = fn;
}

function execHandler (key, fieldName, newState, newProps) {
    console.log('EXEC',key,fieldName,newState);
    const fn = Handlers[key];
    if (fn) {
        return fn(fieldName, newState, newProps);
    }
    return newState;
}

function lookup (state, arr, index = 0) {
    const name = arr[index];
    if (index>=arr.length-1) {
        return state[name];
    }
    return lookup ( state[name] || {}, arr, index+1 );
}

export function changeit (state, arr, index = 0) {
    const item = arr[index];
    const name = item.name;
    if (item.value!==undefined) {
        return { ...state, [name]: item.value };
    }
    let mod = changeit( state[name] || {}, arr, index+1 );
    if (item.handler) {
        const field = arr[index+1].name;
        mod = execHandler(item.handler,field,mod);
    }
    return { ...state, [name]: mod };
}
