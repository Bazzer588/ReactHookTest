import React, { useCallback } from 'react';
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

function doThing (name,v,value,onChange) {
    console.log('DOTHING',name,v);
    const mod = { ...value, [name]: v };    // value[name] = v;
    //if (fieldChanged) {
    //    fieldChanged(name,v,mod);
    //}
    if (onChange)
        onChange({ target: { value: mod } });
}

function PersonContactSection (props) {

    const { value, onChange, path } = props; // touched, showErrors, name, path, coreData

    const memz = useCallback( (name,v) => {
        doThing(name,v,value,onChange,path);
    }, [value] );

    //console.log('MEMZ',memz);

    function rf (fp) {
        return renderField(props,fp,fieldChanged,memz);
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

function renderField (section, field, fieldChanged, memz) {

    const { value } = section; // touched, showErrors, name, path, coreData
    const { name } = field;

    /*function onChange (ev) {
        const v = ev.target.value;
        const mod = { ...value, [name]: v };    // value[name] = v;
        if (fieldChanged) {
            fieldChanged(name,v,mod);
        }
        if (section.onChange)
            section.onChange({ target: { value: mod } });
    }*/

    return <FormField
        {...field}
        // onChange={onChange}
        onChangeField={memz}
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
