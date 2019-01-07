import React from 'react';

function FormField (props) {

    const { name, path, component, onChangeField, value, ...rest } = props;
    const Compo = component || 'input';
    const id = path+'-'+name;
    const inp = value || '';

    console.log('RENDER FormField',name,props.value);

    const onChange = (ev) => {
        const v = ev.target.value;
        onChangeField(name,v);
    };

    return <div className="form-field">
        <label htmlFor={id}>{name}</label>
        <Compo id={id} {...rest} onChange={onChange} value={inp}/>
    </div>;
}

// AS EXPECTED THIS SCREWS UP onChange !!!!!

/*function areEqual (prev, next) {
    return prev.value === next.value; // + touched etc...
}*/

export default React.memo(FormField);
// export default FormField;
