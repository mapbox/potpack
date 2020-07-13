
import potpack from './index.mjs';
import test from 'tape';

test('packs rectangles properly', (t) => {
    const boxes = [];
    for (let i = 1; i < 100; i++) {
        boxes.push({w: i, h: i, i});
    }
    const {w, h, fill} = potpack(boxes);

    t.equal(w, 588);
    t.equal(h, 595);
    t.ok(fill > 0.93);

    t.same(boxes.find(b => b.i === 1), {w: 1, h: 1, i: 1, x: 586, y: 416});

    t.end();
});
