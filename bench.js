
import ShelfPack from '@mapbox/shelf-pack';
import binpack from 'bin-pack';
import potpack from './index.js';

const N = 10000;

const randBox = () => {
    const sizes = [12, 16, 20, 24];
    return {
        w: sizes[Math.floor(Math.random() * sizes.length)],
        h: sizes[Math.floor(Math.random() * sizes.length)],
        x: 0,
        y: 0
    };
};
const randBox2 = () => ({
    w: 1 + Math.floor(Math.random() * 99),
    h: 1 + Math.floor(Math.random() * 99),
    x: 0,
    y: 0
});
const randBoxBinPack = (genBox) => {
    const {w, h} = genBox();
    return () => ({width: w, height: h, x: 0, y: 0});
};

const shelfPackIter = (boxes) => {
    const pack = new ShelfPack(64, 64, {autoResize: true});
    pack.pack(boxes, {inPlace: true});
};
const potpackIter = (boxes) => {
    potpack(boxes);
};
const binpackIter = (boxes) => {
    binpack(boxes);
};

console.log('4 different sizes:');
bench('    bin-pack', binpackIter, randBoxBinPack(randBox));
bench('  shelf-pack', shelfPackIter, randBox);
bench('     potpack', potpackIter, randBox);

console.log('\n100 different sizes:');
bench('    bin-pack', binpackIter, randBoxBinPack(randBox2));
bench('  shelf-pack', shelfPackIter, randBox2);
bench('     potpack', potpackIter, randBox2);

function bench(id, fn, genBox) {
    const boxes = [];
    for (let i = 0; i < N; i++) {
        boxes.push(genBox());
    }

    const start = process.hrtime();
    let s, ns;
    let k = 0;
    do {
        fn(boxes.slice());
        [s, ns] = process.hrtime(start);
        k++;
    } while (s < 1);

    console.log(`${id}: ${Math.round(100 * k / (s + ns / 1e9)) / 100} ops/s`);
}
