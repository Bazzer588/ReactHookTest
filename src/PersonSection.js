import React, { forwardRef, useImperativeMethods } from 'react';
import HookFormSection from './HookFormSection';

const PersonSection = forwardRef( (props,ref) => {

    const { renderField, value } = props;

    useImperativeMethods(ref, () => ({

        fieldChanged(field,fv,mod) {
            if (field==='memberNo') {
                if (!fv) mod.memberDate = '';
                if (fv==='22') mod.memberDate = '1922';
            }
        }

    }));

    return <div>
        <p>
        {renderField({ name: 'memberNo', component: 'input' })}
        </p>
        <p>
        {renderField({ name: 'surname', component: 'input' })}
        </p>
        {value.memberNo &&
        <p>
            {renderField({ name: 'memberDate', component: 'input', placeholder: 'Member start date' })}
        </p>
        }
    </div>;
});

export default HookFormSection(PersonSection);
