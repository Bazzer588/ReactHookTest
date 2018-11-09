import React, { useReducer } from 'react';
// import logo from './logo.svg';
import './App.css';
import {HookTest} from './HookTest'
import {InputTest} from './InputTest'
import {reducer, reducerDefault} from './reducer'

export const DispatchContext = React.createContext(null);

export default function App () {

    const [state, dispatch] = useReducer( reducer, reducerDefault );

    return (
        <DispatchContext.Provider value={dispatch}>
        <div className="App">

            <InputTest name="Car" value={state.Car}/>
            {!!state.Car &&
                <InputTest name="Model" value={state.Model}/>
            }
            <InputTest name="Food" value={state.Food}/>
            <InputTest name="Country" value={state.Country}/>
            <InputTest name="FootballTeam" value={state.FootballTeam}/>
            <p>
                <ResetButton dispatch={dispatch}/>
                {' '}
                <button onClick={()=>dispatch({type:'RESTART'})} type="button">Start Over</button>
            </p>
            <code>
                {JSON.stringify(state,null,' ')}
            </code>

            <HookTest name="T1"/>
            <HookTest name="T2"/>
        </div>
        </DispatchContext.Provider>
    );
}

const ResetButton = React.memo( ({ dispatch }) => {

    console.log('Render Reset Button');

    const reset = () => {
        dispatch({ type: 'SET', name: 'Car', value: '' });
        dispatch({ type: 'SET', name: 'FootballTeam', value: '' });
    };

    return <button onClick={reset} type="button">Reset Car</button>;
});

/*
 <header className="App-header">
 <img src={logo} className="App-logo" alt="logo" />
 <p>
 Edit <code>src/App.js</code> and save to reload.
 </p>
 <a
 className="App-link"
 href="https://reactjs.org"
 target="_blank"
 rel="noopener noreferrer"
 >
 Learn React
 </a>
 </header>
 */