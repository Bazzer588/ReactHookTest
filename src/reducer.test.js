import { changeit, setHandler } from './reducer';

describe('changeit', () => {

    setHandler('onEmploymentChange', (field, mod) => {
        if (field==='hasAddress') {
            if (!mod.hasAddress) {
                mod.address = {};
            }
        }
        return mod;
    });

    setHandler('onAddressMod', (field, mod) => {
        if (field==='country') {
            if (mod.country==='US') {
                mod.zip = '';
                mod.state = 'NY';
            }
        }
        return mod;
    });

    it('works', () => {
        const sample1 = [
            { name: 'myform' },
            { name: 'employment', handler: 'onEmploymentChange' },
            { name: 'address', handler: 'onAddressMod' },
            { name: 'country', value: 'AX' }
        ];
        const state1 = changeit({},sample1);
        expect( state1 ).toEqual({myform:{employment:{address:{country:'AX'}}}});

        const sample2 = [
            { name: 'myform', handler: 'onFormChange' },
            { name: 'employment', handler: 'onEmploymentChange' },
            { name: 'address', handler: 'onAddressMod' },
            { name: 'zip', value: 'S66 2AA' }
        ];
        const state2 = changeit(state1,sample2);
        expect( state2 ).toEqual({myform:{employment:{address:{country:'AX',zip: 'S66 2AA'}}}});

        const sample3 = [
            { name: 'myform', handler: 'onFormChange' },
            { name: 'employment', handler: 'onEmploymentChange' },
            { name: 'address', handler: 'onAddressMod' },
            { name: 'country', value: 'US' }
        ];
        const state3 = changeit(state2,sample3);
        expect( state3 ).toEqual({myform:{employment:{address:{country:'US',zip: '', state: 'NY'}}}});

        const sample4 = [
            { name: 'myform', handler: 'onFormChange' },
            { name: 'employment', handler: 'onEmploymentChange' },
            { name: 'hasAddress', value: false }
        ];
        const state4 = changeit(state3,sample4);
        expect( state4 ).toEqual({myform:{employment:{hasAddress:false, address:{}}}});
    });
});
