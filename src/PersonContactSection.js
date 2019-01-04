import React from 'react';

const MemberNo = { name: 'memberNo', component: 'input' };
const Surname = { name: 'surname', component: 'input' };
const MemberDate = { name: 'memberDate', component: 'input', placeholder: 'Member start date' };

function fieldChanged (field,fv,mod) {
    if (field==='memberNo') {
        if (!fv) mod.memberDate = '';
        if (fv==='22') mod.memberDate = '1922';
    }
}

function PersonContactSection (props) {

    const { value } = props; // touched, showErrors, name, path, coreData

    function rf (fp) {
        return <p>{renderField(props,fp,fieldChanged)}</p>;
    }

    return <div>
        {rf(MemberNo)}
        {rf(Surname)}
        {value.memberNo &&
            rf(MemberDate)
        }
        <p>End of</p>
    </div>;
}

function areEqual (prev, next) {
    return prev.value === next.value;
}

export default React.memo(PersonContactSection,areEqual);

/** COMMON METHOD */

function renderField (props, fieldProps, fieldChanged) {

    const { value } = props;
    const { name } = fieldProps;

    function onChange (ev) {
        const v = ev.target.value;
        const mod = { ...value, [name]: v };    // value[name] = v;
        if (fieldChanged) {
            fieldChanged(name,v,mod);
        }
        if (props.onChange)
            props.onChange({ target: { value: mod } });
    }

    const Compo = fieldProps.component;
    return (
        <Compo
            {...fieldProps}
            onChange={onChange}
            path={props.path + '-' + name}
            value={value[name] || ''}
        />
    );
}
