
function compare (a,b) {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    let i;

    for (i = ka.length; i>=0; i--) {
        const k = ka[i];
        if (a[k] !== b[k]) {
            if (typeof a[k] === 'function' && b[k]) continue;
            return false;
        }
    }

    for (i = kb.length; i>=0; i--) {
        const k = kb[i];
        if (b[k] !== a[k]) {
            if (typeof b[k] === 'function' && a[k]) continue;
            return false;
        }
    }

    return true;
}

describe('compares things', () => {

    function test (c,a,b,x) {
        it(c, () => {
            expect(compare(a,b)).toEqual(x);
        });
    }

    function dum1 () { return 2 }
    const dum2 = () => 56;
    const val1 = {};
    const val2 = {};

    test('1',{ x: 21, z: 'ABC' },{ x: 21, z: 'ABC' },true);
    test('2',{ x: 21, z: 'ABC' },{ x: 21, z: 'xBC' },false);
    test('3',{ x: 21, z: 'ABC', q: '' },{ x: 21, z: 'ABC' },false);
    test('4',{ x: 21, z: 'ABC' },{ x: 21, z: 'ABC', qqq: 'EEE' },false);
    test('5',{ value: val1 },{ value: val1 },true);
    test('6',{ value: val2 },{ value: val1 },false);

    test('11',{ x: 21, z: 'ABC', onCh: () => {} },{ x: 21, z: 'ABC', onCh: () => {} },true);
    test('12',{ x: 21, z: 'ABC', onCh: dum1 },{ x: 21, z: 'ABC', onCh: dum2 },true);
    //test('21',{ x: 21, z: 'ABC', onCh: () => {} },{ x: 21, z: 'ABC' },true);
    //test('22',{ x: 21, z: 'ABC' },{ x: 21, z: 'ABC', onCh: () => {} },true);
});
