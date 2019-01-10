
export const reducerDefault = { Food: 'Fish', FootballTeam: 'Arsenal', FooBar: { surname: 'Jones' },
    value: {},
    touched: {}
};

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
        case 'MAGIC':
            return changePath(state,action.list);
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

function execHandler (key, fieldName, newState) {
    console.log('EXEC',key,fieldName,newState);
    const fn = Handlers[key];
    if (fn) {
        return fn(newState, fieldName);
    }
    return newState;
}

/*function lookup (state, arr, index = 0) {
    const name = arr[index];
    if (index>=arr.length-1) {
        return state[name];
    }
    return lookup ( state[name] || {}, arr, index+1 );
}*/

export function changeit (state, arr, index = 0) {
    const item = arr[index];
    const name = item.name;
    if (item.value!==undefined) {
        return execHandler(item.handler, name, { ...state, [name]: item.value });
    }
    let mod = changeit( state[name] || {}, arr, index+1 );
    if (item.handler) {
        const field = arr[index+1].name;
        mod = execHandler(item.handler,field,mod);
    }
    return { ...state, [name]: mod };
}

/** NEW WAY */

export function changePath (state, path, index = 0) {
    const { value, touched } = state;
    const item = path[index];
    //console.log(item,'VALUE',value);
    const name = item.name;
    if (item.value!==undefined) {
        const m = { value: { ...value, [name]: item.value }, touched: { ...touched, [name]: item.touched } };
        return execHandler(item.handler, name, m);
    }
    // carry on up the path tree
    let mod;
    const field = path[index+1].name;
    if (item.isArray || parseInt(field)>=0) {
        mod = changeArray( { value: value[name] || DEF_ARR, touched: touched[name] || DEF_ARR }, path, index+1 );
    } else {
        mod = changePath({value: value[name] || DEF_OBJ, touched: touched[name] || DEF_OBJ}, path, index + 1);
    }
    // do we have a handler?
    if (item.handler) {
        mod = execHandler(item.handler,field,mod);
    }
    return { value: { ...value, [name]: mod.value }, touched: { ...touched, [name]: mod.touched } };
}

/** in state, value and touched are arrays */

function changeArray (state, path, index = 0) {
    const { value, touched } = state;
    const item = path[index];
    const name = item.name;
    if (item.value!==undefined) {
        const mv = [...value];   mv[name] = item.value;
        const mt = [...touched]; mt[name] = item.touched;
        return { value: mv, touched: mt };
    }
    let mod = changePath( { value: value[name] || DEF_OBJ, touched: touched[name] || DEF_OBJ }, path, index+1 );
    if (item.handler) {
        const field = path[index+1].name;
        mod = execHandler(item.handler,field,mod);
    }
    const mv = [...value];   mv[name] = mod.value;
    const mt = [...touched]; mt[name] = mod.touched;
    return { value: mv, touched: mt };
}

const DEF_OBJ = {};
const DEF_ARR = [];
