import React, { useRef } from 'react';

export default function makeWrapped (Wrapped) {

    function TheSection (props) {
        const theReal = useRef(null);

        const { value = {} } = props;

        function renderField (fieldProps) {

            const { name } = fieldProps;

            function onChange (ev) {
                const v = ev.target.value;
                const mod = { ...value, [name]: v };    // value[name] = v;
                if (theReal.current) {
                    console.log('THeReal is',theReal.current);
                    theReal.current.fieldChanged(name,v,mod);
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

        return (
            <Wrapped
                {...props}
                renderField={renderField}
                ref={theReal}
            />
        );
    }

    return React.memo(TheSection);
}

/** render

    <div>
    {renderField(MemberNo)}
    {renderField(Surname)}
    {renderField(DateOfBirth)}
    </div>

 */