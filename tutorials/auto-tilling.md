# Basic Auto Tilling
Build your own auto tilling implementation

![auto tilling thumbnail](/tutorials/autotilling.gif)

The First step is to assign each tile a number to define it's state. Once done, you can then assign each individule direction from the tile to a binary number.

![auto tilling image](/tutorials/binary.svg)

For every tile, loop over the neighbouring tiles and check to see whether they are occupied. If they are, add that direction's corrosponding binary number to the tile's state value. This creates a unique identifying number for every possible state a tile could be in.

```lua
tile.state = 0

if --[[tile to the top is occupied]] then
	tile.state = tile.state + 1
end

if --[[tile to the right is occupied]] then
	tile.state = tile.state + 2
end

if --[[tile to the bottom is occupied]] then
	tile.state = tile.state + 4
end

if --[[tile to the left is occupied]] then
	tile.state = tile.state + 8
end

return tile.state
```

Now, you should be able to easily compute which sprite to select when drawing your tile!

![auto tilling image](/tutorials/tiles.svg)

`Written by Dot32`
`19th Jan 2021`