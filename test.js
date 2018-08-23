
import potpack from './index.mjs';
import {test} from 'tape';

test('packs rectangles properly', (t) => {
    const boxes = [];
    for (let i = 0; i < 100; i++) {
        boxes.push({w: i, h: i});
    }
    const {w, h, fill} = potpack(boxes);

    t.equal(w, 588);
    t.equal(h, 595);
    t.ok(fill > 0.93);

    t.end();
});
