# Axis Aligned Bounding Box's

understand the logic behind aabb

[click here to go back to platformer physics](https://dot32.netlify.app/tutorials/custom-platformer-physics)

The idea behind aabb intercept detection is that if we have the coordinates and width/height of two rectangles we can calculate whether they are interfering in eachothers space.

**Get some paper out and sketch this to help you proccess the maths!**
If the left side of the first rectangle's x position is less than the right side of the second rectangle's x position, and the right side of the first rectangle's x is greater than the left side of the second triangle's x, theN the two rectangles must be within eachothers X.

If the top side of the first rectangle's y position is less than the bottom side of the second rectangle's y position, and the bottom side of the first rectangle's y is greater than the top side of the second triangle's y, then the two rectangles must be within eachothers Y.

If the first rectangle is within both the x and the y of the second rectangle, then the rectangles must be touching!

![aabb example image]("/tutorials/custom-platformer-physics/aabb.svg")

We can represent rectangles in code with x, y, width and height parametres. Our rectangle is drawn from the top left corner at (x,y) and extends right/downwards for its width and height respectively.

This means we can represent an aabb as checking:

```lua
if x1 < x2 + width2 and x1 + width1 > x2
and y1 < y2 + height2 and y1 + height1 > y2
then
	--colliding on both the x and y axis
end
```
The first line of this aabb detects for the x axis, and the second line detects for the y axis overlap.

[click here to go back to platformer physics](https://dot32.netlify.app/tutorials/custom-platformer-physics)

`Written by Dot32`
`18th Jan 2021`

