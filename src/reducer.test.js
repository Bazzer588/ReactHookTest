import { changeit, setHandler, changePath } from './reducer';

describe('changeit', () => {

    setHandler('onEmploymentChange', (mod, field) => {
        if (field==='hasAddress') {
            if (!mod.hasAddress) {
                mod.address = {};
            }
        }
        return mod;
    });

    setHandler('onAddressMod', (mod, field) => {
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

    // test with value and touched

    setHandler('xxCountry', (state) => {
        if (state.value.country==='US') {
            const { value, touched } = state;
            return { value: { ...value, zip: '' }, touched: { ...touched, zip: true } };
            //state.value.zip = true;
            //state.touched.zip = true;
        }
        return state;
    });

    it('does touch too',() => {
        const m1 = [
            { name: 'myform' },
            { name: 'employment' },
            { name: 'hasAddress', value: false }
        ];
        const s1 = changePath({ value: {}, touched: {} },m1);
        console.log('STATE',JSON.stringify(s1));

        const m2 = [
            { name: 'myform' },
            { name: 'employment', handler: 'xxEmployment' },
            { name: 'salary', value: '2022.67', touched: true }
        ];
        const s2 = changePath(s1,m2);
        console.log('STATE',JSON.stringify(s2));

        const m3 = [
            { name: 'myform' },
            { name: 'employment' },
            { name: 'address', handler: 'xxAddress' },
            { name: 'country', value: 'US', touched: false, handler: 'xxCountry' }
        ];
        const s3 = changePath(s2,m3);
        console.log('STATE',JSON.stringify(s3,null,' '));
    });

    it('updates array of objects',() => {
        const m1 = [
            { name: 'myform' },
            { name: 'addrHist' },
            { name: '2' },
            { name: 'country', value: 'US', touched: false }
        ];
        const s1 = changePath({ value: {}, touched: {} },m1);
        console.log('STATE',JSON.stringify(s1,null,' '));

        const m2 = [
            { name: 'myform' },
            { name: 'addrHist' },
            { name: '0' },
            { name: 'keyCode' },
            { name: 'id', value: '22', touched: true }
        ];
        const s2 = changePath(s1,m2);
        console.log('STATE',JSON.stringify(s2,null,' '));
    });

    it('updates a simple array of strings',() => {
        const m1 = [
            {name: 'myform'},
            {name: 'langList'},
            {name: '1', value: 'GB', touched: false}
        ];
        const s1 = changePath({value: {}, touched: {}}, m1);
        console.log('STATE', JSON.stringify(s1, null, ' '));

        const m2 = [
            {name: 'myform' },
            {name: 'langList'},
            {name: '0', value: 'CN', touched: true}
        ];
        const s2 = changePath(s1,m2);
        console.log('STATE',JSON.stringify(s2,null,' '));
    });
});
