/*
ISC License

Copyright(c) 2018, Mapbox

Permission to use, copy, modify, and / or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS.IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
*/

export default function potpack(boxes, powerOf2 = false) {
	// calculate total box area and maximum box width
	let area = 0;
	let maxWidth = 0;

	for (const box of boxes) {
		area += box.w * box.h;
		maxWidth = Math.max(maxWidth, box.w);
	}
	if (powerOf2) maxWidth = nextPow2(maxWidth);

	// aims for a square if powerOf2 is false,
	// else tries to fit boxes to the smallest power of 2 canvas size possible
	// slightly adjusted for sub-100% space utilization
	var startWidth = Math.max(Math.ceil(Math.sqrt(area / 0.95)), maxWidth);
	if (powerOf2) startWidth = nextPow2(startWidth);

	// start with a single empty space, unbounded at the bottom
	const spaces = [{ x: 0, y: 0, w: startWidth, h: Infinity }];

	let width = 0;
	let height = 0;

	for (const box of boxes) {
		// look through spaces backwards so that we check smaller spaces first
		for (let i = spaces.length - 1; i >= 0; i--) {
			const space = spaces[i];

			// look for empty spaces that can accommodate the current box
			if (box.w > space.w || box.h > space.h) continue;

			// found the space; add the box to its top-left corner
			// |-------|-------|
			// |  box  |       |
			// |_______|       |
			// |         space |
			// |_______________|
			box.x = space.x;
			box.y = space.y;

			height = Math.max(height, box.y + box.h);
			width = Math.max(width, box.x + box.w);

			if (box.w === space.w && box.h === space.h) {
				// space matches the box exactly; remove it
				const last = spaces.pop();
				if (i < spaces.length) spaces[i] = last;
			} else if (box.h === space.h) {
				// space matches the box height; update it accordingly
				// |-------|---------------|
				// |  box  | updated space |
				// |_______|_______________|
				space.x += box.w;
				space.w -= box.w;
			} else if (box.w === space.w) {
				// space matches the box width; update it accordingly
				// |---------------|
				// |      box      |
				// |_______________|
				// | updated space |
				// |_______________|
				space.y += box.h;
				space.h -= box.h;
			} else {
				// otherwise the box splits the space into two spaces
				// |-------|-----------|
				// |  box  | new space |
				// |_______|___________|
				// | updated space     |
				// |___________________|
				spaces.push({
					x: space.x + box.w,
					y: space.y,
					w: space.w - box.w,
					h: box.h
				});
				space.y += box.h;
				space.h -= box.h;
			}
			break;
		}
	}

	return {
		w: nextPow2(width), // container width
		h: nextPow2(height) // container height
	};
}

const nextPow2 = v => {
	if (v != 0 && (v & (v - 1)) == 0) return v;
	var p = 2;
	while ((v >>= 1)) {
		p <<= 1;
	}
	return p;
};
