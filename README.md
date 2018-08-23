# potpack

A tiny JavaScript library for packing 2D rectangles into a near-square container,
which is useful for generating CSS sprites and WebGL textures.

Similar to [shelf-pack](https://github.com/mapbox/shelf-pack),
but static (you can't add items once a layout is generated), and aims for maximal space utilization.

A variation of algorithms used in
[rectpack2D](https://github.com/TeamHypersomnia/rectpack2D) and
[bin-pack](https://github.com/bryanburgers/bin-pack),
which are in turn based on
[this article by Blackpawn](http://blackpawn.com/texts/lightmaps/default.html).

## Example usage

```js
import potpack from 'potpack';

const boxes = [
    {w: 100, h: 200},
    {w: 300, h: 50},
    ...
];

const {w, h, fill} = potpack(boxes);
// w and h are resulting container's width and height;
// fill is the space utilization value (0 to 1), higher is better

// box objects are augmented with x, y positions on the layout:
boxes[0]; // {w: 100, h: 200, x: 0,   y: 0}
boxes[1]; // {w: 300, h: 50,  x: 100, y: 0}
```
