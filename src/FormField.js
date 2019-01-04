import React from 'react';

function FormField (props) {

    const { name, path, component, ...rest } = props;
    const Compo = component;
    const id = path+'-'+name;

    return <div>
        <label htmlFor={id}>{name}</label>
        <Compo id={id} {...rest}/>
    </div>;
}

// AS EXPECTED THIS SCREWS UP onChange !!!!!

function areEqual (prev, next) {
    return prev.value === next.value; // + touched etc...
}

export default React.memo(FormField,areEqual);
