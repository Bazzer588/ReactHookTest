import React from 'react';
import FormField from './FormField';

const MemberNo = { name: 'memberNo', component: 'input' };
const Surname = { name: 'surname', component: 'input', required: true };
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
    return prev.value === next.value; // + touched etc...
}

export default React.memo(PersonContactSection,areEqual);

/** COMMON METHOD */

function renderField (section, field, fieldChanged) {

    const { value } = section; // touched, showErrors, name, path, coreData
    const { name } = field;

    function onChange (ev) {
        const v = ev.target.value;
        const mod = { ...value, [name]: v };    // value[name] = v;
        if (fieldChanged) {
            fieldChanged(name,v,mod);
        }
        if (section.onChange)
            section.onChange({ target: { value: mod } });
    }

    console.log('RF',name,value[name]);

    return <FormField
        {...field}
        onChange={onChange}
        path={section.path}
        value={value[name] || ''}
    />;

    /*
    const Compo = field.component;
    return (
        <Compo
            {...field}
            onChange={onChange}
            path={section.path + '-' + name}
            value={value[name] || ''}
        />
    );
    */
}
