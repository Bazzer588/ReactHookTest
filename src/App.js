import React, { useReducer } from 'react';
// import logo from './logo.svg';
import './App.css';
import {HookTest} from './HookTest'
import {InputTest} from './InputTest'
// import PersonSection from './PersonContactSection'
import PersonSection from './HookTestForm'
// import PersonSection from './HookTestReducer'
// import PersonSection from './TestForm'
import {reducer, reducerDefault} from './reducer'

export const DispatchContext = React.createContext(null);

export default function App () {

    // console.log('APP RENDER');

    const [state, dispatch] = useReducer( reducer, reducerDefault );

    const onChange = (ev) => {
        console.log('FOO',ev.target.value);
        dispatch({ type: 'SET', name: 'FooBar', value: ev.target.value });
    };

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
            <PersonSection path="FooBar" value={state.FooBar} onChange={onChange} />
            <PersonSection path="Other" />

            <HookTest name="T1"/>
            <HookTest name="T2"/>
            <button onClick={walk} type="button">Walk tree</button>
        </div>
        </DispatchContext.Provider>
    );
}

function walk () {

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