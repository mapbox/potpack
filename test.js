
import potpack from './index.js';
import test from 'node:test';
import assert from 'node:assert/strict';

test('packs rectangles properly', () => {
    const boxes = [];
    for (let i = 1; i < 100; i++) {
        boxes.push({w: i, h: i, i});
    }
    const {w, h, fill} = potpack(boxes);

    assert.equal(w, 588);
    assert.equal(h, 595);
    assert.ok(fill > 0.93);

    assert.deepEqual(boxes.find(b => b.i === 1), {w: 1, h: 1, i: 1, x: 586, y: 416});
});
