
/** simple node tests without transpile
 *  run with
 *  node src/node_test
 */

console.log('Hello, node_test',new Date());

const merge = (a,b) => {
    const x = { ...a, ...b};
    console.log('MERGED',x);
};

const mergeArray = (a,b) => {
    const x = [ ...a, ...b ];
    console.log('MERGE ARRAY',x);
};

merge( { a:100, b: 22 }, { a: 'Foo', c: 'Yah' } );
merge( [1,2,3], [4,5,6] );
merge( { a:77777 }, undefined );

mergeArray( [1,2,3], [4,5,6] );
//mergeArray( [1,2,3], { x: 100, y: 999 } ); // error b is not iterable
//mergeArray( [1,2,3], undefined ); // TypeError: b is not iterable

// classes ?

class Bar {
    constructor( ) {
        this.created = Date.now();
    }
}

const b = new Bar();
console.log('Bar',b);

// removing things
function testRemove () {
    const t = { a: 11, b: 'Ho', c: new Date(), d: 9998 };
    const { a, d, ...rest } = t;
    console.log('rest',rest);
}

testRemove();