# Circle VS Rectangle Collision
This written tutorial will show you how to detect interception between circles and rectangles, and then resolve them with basic maths.

![thumbnail gif](/tutorials/rectvcircle.gif)

You may already know that to detect interception between a circle and a point, all we need is to calculate the distance from the point to the centre of the circle. If the distance is less than the radius, then the point has to be within the circle.
This actually means that the only information we need to find for this collision detection is the closest point on the rectangle to the circle. This will give us the direct distance to measure against the radius.

Finding the closest point is actually really simple! It is done by getting the coordinates of the circle and "clamping" them onto the rectangle:

```lua
local px = circle.x
local py = circle.y
px = math.max(px, rectangle.x)
px = math.min(px, rectangle.x + rectangle.w)
py = math.max(py, rectangle.y)
py = math.min(py, rectangle.y + rectangle.h)

-- sets px/py to the circle's coordinates and clamps it to the bounds of the rectangle
```

And just like this, our entire interception function can be written as this:

```lua
function circleVsRectangle(circle, rectangle)
  local px = circle.x
  local py = circle.y
  px = math.max(px, rectangle.x)
  px = math.min(px, rectangle.x + rectangle.w)
  py = math.max(py, rectangle.y)
  py = math.min(py, rectangle.y + rectangle.h)

  return ((circle.y-py)^2 + (circle.x-px)^2) < circle.r^2
  -- simply check the distance from the clamped px/py versus the circle
  -- optimised length formula that removes sqrt by compairing with radius^2
end
```
For reference, the circle is in the format of `{x =, y =, r =}`, and the rectangle is in the format of `{x =, y =, w =, h =}`

`x` is the position of the circle on the x axis <br>
`y` is the position of the circle on the y axis <br>
`r` is radius <br>
`w` is width <br>
`h` is height <br>

## Resolving the collision
Resolving collisions will be different in every use case, as every project has different contexts. In this example the only resolution being done will be to relocate the circle from outside the box

The first change we will make will be to also return the location of the point when intercepting

```lua
return (((circle.y-py)^2 + (circle.x-px)^2) < circle.r^2), {x = px, y = py} -- notice the table I added, seperated by a comma!
```
In Lua, when returning two values (seperated by the comma), accessing the second one is done like such
```lua
  local bool, point = circleVsRectangle(circle, rect)
```
we can then use `bool` in an if statement to detect collision and `point` to tell in which direction the circle has to move.

The actual resolution is done as such:
- get offset from circle to point
- get the distance by getting the "length" of the offset vector
- create a "direction" vector from dividing the x/y of the offset by the distance
- calculate how far the player will have to travel along the direction vector by subtracting the "distance" from the circle radius
- actually move the player by the calculated amount in the direction of the direction vector

Try to understand what this is doing and how it works before copying the code below: 
```lua
-- in the circle's update loop
local bool, point = circleVsRectangle(circle, rect)

if bool then
  local offset = {x = circle.x - point.x, y = circle.y - point.y}
  local distance = math.sqrt(offset.x^2 + offset.y^2) -- pythatgoras babyy
  local direction = {x = offset.x/distance, y = offset.y/distance} -- direction stored as a normalised vector
  local moveLen = circle.r - distance

  circle.x = circle.x + moveLen*direction.x
  circle.y = circle.y + moveLen*direction.y
end
```
Note that in Lua, a "vector" is stored as a table `{x = 0, y = 0}`, so that we can look it up later with `table.x` and `table.y` 

This particular resolution algorythm suits a top down game in which the player is the circle and the map is built of rectangles. If that isn't what you were going for, hopefully you understood the jist and can now build your own resolution algorythm ✨ 

When all else fails, you could always google point versus circle collision resolution.

Happy coding!

<div id="json">
  {
    "author": "Dot32",
    "date": "18th Jan 2021",
    "edited": "28th Aug 2021",
    "title": "Circle VS rectangle collision detection",
    "description": "This written tutorial will show you how to detect interception between circles and rectangles.",
    "image": "/tutorials/rectvcircle.gif"
  }
</div>