# Circle VS Rectangle Collision
This written tutorial will show you how to detect interception between circles and rectangles .

![thumbnail gif](/tutorials/rectvcircle.gif)

You may already know that to detect interception between a circle and a point, all we need is to calculate the distance from the point to the centre of the circle. If the distance is less than the radius, then the point has to be within the circle.
This actually means that the only information we need to find for this collision detection is the closest point on the rectangle to the circle. This will give us the direct distance to measure against the radius.

Finding the closest point is actually really simple! We can simply get the coordinates of the circle and "clamp" them onto the rectangle:

```lua
local px = circle.x
local py = circle.y
px = math.max(px, rectangle.x)
px = math.min(px, rectangle.x + rectangle.w)
py = math.max(py, rectangle.y)
py = math.min(py, rectangle.y + rectangle.h)

-- sets px/py to the circle's coordinates and clamps it to the bounds of the rectangle
```

And just like this, our entire collision function can be written as this:

```lua
function circleVsRectangle(circle, rectangle)
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

<div id="json">
  {
    "author": "Dot32",
    "date": "18th Jan 2021",
    "edited": "21st Jul 2021",
    "title": "Circle VS rectangle collision detection"
  }
</div>