import React, { useState } from 'react';

export const HookTest = React.memo( ({ name }) => {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times on {name}</p>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
            {' '}
            <button onClick={() => setCount( nc => nc + 1 )}>
                Increment
            </button>
        </div>
    );
});
