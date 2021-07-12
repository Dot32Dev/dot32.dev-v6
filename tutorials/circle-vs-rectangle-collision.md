# Circle VS Rectangle Collision
This written tutorial will show you how to detect interception between circles and rectangles .

![thumbnail gif](/tutorials/rectvcircle.gif)

Now, you should already know that to detect interception between a circle and a point, all we need is to find the distance from the point to the centre of the circle. If the distance is less thand the radius, then the point has to be within the circle.
This actually means that the only information we need to find is of the cloesest point on the rectangle to the circle. If we can find the closest point, we can measure the distance and detect interception.

Finding the closest point is actually really simple. We can simply "clamp" the coordinates of the circle onto the rectangle.

```lua
local px = circle.x
local py = circle.y
px = math.max(px, rectangle.x)
px = math.min(px, rectangle.x + rectangle.w)
py = math.max(py, rectangle.y)
py = math.min(py, rectangle.y + rectangle.h)

-- clamps the cirlce's position to the boundaries of the rectangle
```

And just like this, our entire collision function can be written as this:

```lua
function circle_Rectangle(circle, rectangle)
  local px = circle.x
  local py = circle.y
  px = math.max(px, rectangle.x)
  px = math.min(px, rectangle.x + rectangle.w)
  py = math.max(py, rectangle.y)
  py = math.min(py, rectangle.y + rectangle.h)

  return ( (circle.y-py)^2 + (circle.x-px)^2 ) < circle.r^2
  -- simply check the distance from the clamped px/py versus the circle
  -- optimised length formula that removes sqrt by compairing with radius^2
end
```
Circle is in the format of {x=, y=, r=}, rectangle is in {x=,y=,w=,h=}

Happy coding!

`Written by Dot32`
`19th Jan 2021`