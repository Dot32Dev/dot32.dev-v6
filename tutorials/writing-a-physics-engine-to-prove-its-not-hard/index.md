# Writing a physics engine to prove it's not hard

![Thumbnail gif](/tutorials/writing-a-physics-engine-to-prove-its-not-hard/thumb.gif)

When it comes to implementing basic physics in games, many resort to the all in one solution that is Box2D. However, while Box2D may just work, it is overkill for most applications. If all you need is box-to-box collisions, then much simpler, reliable and efficient solutions can be implemented instead. A platformer does not need rotations, realistic mass, centre of weight, or anything of the sort for it to feel fluid, and in fact implementing your own physics engine can help customise the feel of your game further. 

## Getting Started

Start by creating a `player` table to store properties such as position and speed. 
```lua
local player = {
	x=0,
	y=0,
	xV=0,
	yV=0,
	-- You may also add width/height properties
}
```
The `V` stands for velocity, and will be how we track the player's momentum. When moving our player, instead of directly modifying the player's location, will we add to its velocity, its speed. This allows the player to build speed over time and conserve it. We will continuously add the player's velocity to its position to achieve the appearance of motion. 

Here, a square is being drawn at the player's coordinates as its velocity is increased every frame.

<video autoplay="" playsinline="" loop="" muted="">
  <source src="/images/velocity.mp4" type="video/mp4">
</video>

The update code looks something like this:
```lua
function love.update()
	-- Update the player's position
	player.x = player.x + player.xV
	-- Increase the player's speed
	player.xV = player.xV + 1
end
```
The player's `x` position is being updated by its velocity every frame, and the velocity is being increased every frame. This creates the effect of ever-accelerating motion!
As the player is constantly being moved by a larger and larger value, it appears to speed up over time. In a platformer, this is how gravity is simulated!

Next in moving the player is accepting player input. It's pretty simple, you just add to the velocity for the direction that you are going. If the right key is pressed, add to the `x` velocity, and if the left key is pressed, subtract. However, we run into an issue. Once you get going, it's almost impossible to stop. This is solved by continuously multiplying the velocity by a friction value, or lerping it to zero.
```lua
player.xV = player.xV * 0.9
```
This will subtract 10% of the player's speed every frame, eventually bringing the player to a stop. Make sure to adjust the values so that the player's speed and momentum feels right. The result of this change should look something like this.
<video autoplay="" playsinline="" loop="" muted="">
  <source src="/images/movement.mp4" type="video/mp4">
</video>
Now, I will introduce gravity by constantly adding to the `y` velocity as described earlier. Note that there is no reason to put friction on the sky, unless you really want air resistance. But oh no! I'm just falling into the void!

## The Basic Solution
Add an if statement to check if the player is off the screen. If it is, set its `y` position to just above the edge of the screen. 
```lua
if player.y + player.height > 600 then
	player.y = 600 - player.height
	player.yV = 0
end
```
In this example, the height of the window is 600. Our player is stored as a position, and with `width`/`height` properties extending to the bottom right. We want to collide if the bottom of the player begins going off-screen, so we check for `player.y + player.height`. Upon sinking below the floor, we want to set the player back on top of the floor, so we set its position to `600 - player.height`. We also reset the player's `y` velocity to avoid unnecessarily moving the player further, and to avoid issues that could arise in the future from not doing so. Currently it won't make much of a difference as the the if statement will keep resetting it back anyway. 

You can also add jump logic inside the if statement, because this code will always be run when the player is on the ground.
```lua
if player.y + player.height > 600 then
	player.y = 600 - player.height
	player.yV = 0
	
	if love.keyboard.isDown("up") then
		-- Set the Y velocity to a negative value to jump
		player.yV = -5
	end
end
```

Perfect! We have a little player jumping around the scene.
<video autoplay="" playsinline="" loop="" muted="">
  <source src="/images/bounce_that_boi.mp4" type="video/mp4">
</video>


Now, lets abstract the collision into a `platforms` table, rather than hard coding the floor value. Every "platform" in the platforms table will contain its own x, y, width and height properties!
```lua
local platforms = {
	{
		-- Floor
		x=0,
		y=600,
		width=800,
		height=10,
	},
	{
		-- Different platform
		x=450,
		y=500,
		width=100,
		height=30,
	}
}
```
After updating your draw function to draw them, we must now loop over them to test collision with them in the update function. Update your previously single if statement to this loop:
```lua
for i, platform in ipairs(platforms) do -- Loop over platforms
	-- Compare against platform.y instead of 600
	if player.y + player.height > platform.y then
		player.y = platform.y - player.height
		player.yV = 0
		
		if love.keyboard.isDown("up") then
			player.yV = -5
		end
	end
end
```
But this has a glaring issue! You probably already saw this coming, but this code only compares the Y values. Collision is detected even when the player walks off the end of the platform.
![Screenshot 2023-07-22 at 15.08.28.png](/tutorials/writing-a-physics-engine-to-prove-its-not-hard/Screenshot_2023-07-22_at_15.08.28.png)

## AABB Collision Detection
AABB collision detection, short for "Axis Align Bounding Box" collision detection, is a method of detecting interception between two unrotated rectangles that is very simple and efficient. 

In our engine's current state, we are checking for whether the bottom of our player crosses below the top of our platform or not. However, this was an incomplete simplification, even for the Y axis. If the player is completely below the platform, it should not count as a collision. We need to do our current check, *and also* check that the top of the player is above the bottom of the platform. If both of these are true, then the player must be intercepting with the platform on the Y axis!

Similarily for the X axis, if the right side of the player is "more right" than the platform's left side, and the player's left side is "more left" than the platforms right side, we have interception on the X axis!

<!-- Consider two rectangles, that may or may not be intercepting eachother. If the x position of the left side of the first rectangle is less than x position right side of the second rectangle, *and* the x position of the right side of the first rectangle is greater than the x position of the left side of the second triangle, then the two rectangles are overlapping on the X axis!

The exact same is true for the Y axis! If the y position of the top of the first rectangle is less than the than the bottom of the second rectangle, and the y position of the bottom of the first rectangle is greater than the y position of the top of the second rectangle, then the rectangles must be overlapping on the Y axis.  -->

In order for a collision to occur, we must be overlapping on both the X and Y axises. 

![aabb explanation.png](/tutorials/writing-a-physics-engine-to-prove-its-not-hard/aabb_explanation.png)
If you understand the logic behind it, we can now continue onto the implementation. While the logic can be written as a single if statement, i'm going to divide it into a couple functions, the reason to which will be explained later on. 
```lua
function aabb_x_check(player, platform)
	return player.x + player.width > platform.x 
		and player.x < platform.x + platform.width
end

function aabb_y_check(player, platform)
	return player.y + player.height > platform.y 
		and player.y < platform.y + platform.height
end
```
Our collision function can now be rewritten like so:
```lua
for i, platform in ipairs(platforms) do
	if aabb_x_check(player, platform) 
	and aabb_y_check(player, platform) then
		player.y = platform.y - player.height
		player.yV = 0

		if love.keyboard.isDown("up") then
			player.yV = -5
		end
	end
end
```
Et voilà! We now correctly detect when or when not we are colliding with the platforms! 
<video autoplay="" playsinline="" loop="" muted="">
  <source src="/images/aabb_working.mp4" type="video/mp4">
</video>

However, what we have achieved still isn't perfect! In fact, there are more glaring issues to be solved. Currently, no matter what edge we hit the platform from, our collision script resolves it by taking us to the top of the platform. This is the desired behaviour when our player is coming from above the platform, but is incorrect in other cases! Look what happens if the player jumps into the platform from below.
<video autoplay="" playsinline="" loop="" muted="">
  <source src="/images/through_the_platform.mp4" type="video/mp4">
</video>

## Resolving the Collision Correctly 
In order to know which way to resolve the collision, you must know what direction the player entered the platform from. In order to know what direction the player entered the platform from, you must know where the player was in the previous frame. That's one way to do it at least. 

See, on the previous frame, you can be sure that the player wasn't colliding. If it did collide, it would have moved itself out and you wouldn't be colliding this frame. But more specifically, we are looking for collisions on _certain axis's_, and this is why we wrote two seperate functions for the AABB collision. If, in the previous frame, the player was within the bounds of the platform on only the X, but not the Y, and in this frame we are colliding, then we know the collision that just occurred happened because the player entered the platform's Y bounds. This limits the possible impact directions to being either up or down, and tells us the collision resolution should effect the player's `y` position. If instead, the collision happed because the player entered the X bounds, then we know we need to resolve the collision by changing the `x` position. 

![resolution explanation 1.png](/tutorials/writing-a-physics-engine-to-prove-its-not-hard/resolution_explanation.png)

However, this doesn't directly tell us which direction to move, only the axis to move in. In order to infer the correct direction, we can take a look at the velocity. If we know we're on the Y axis, and the Y velocity is positive, we can assume that we were moving downwards and therefor need to move upward out of the platform. If instead the Y velocity is negative, we must have been moving upwards and be in need of moving down. As with all things, this applies to the X axis as well.

Now that i've explained the theory, we can get into the implementation. I'm going to write a function to calculate where the player previously was based on its velocity. If we subtract the player's velocity from its current position, we find its previous location. I will place the function in the player table for organisation purposes.
```lua
local player = {
	x=400-20,
	y=300,
	xV=0,
	yV=0,
	width=40,
	height=40,
	previous=function(self) 
		-- Return a table compatible with our AABB functions
		return {
			-- Calculates previous position
			x=self.x - self.xV,
			y=self.y - self.yV,
			width=self.width,
			height=self.height,
		}
	end,
}
```
In order to call this function we will need to call `player:previous()`. And with that out of the way, lets write this physics resolution! 
```lua
for i, platform in ipairs(platforms) do
	if aabb_x_check(player, platform) 
	and aabb_y_check(player, platform) then
		if aabb_x_check(player:previous(), platform) then
			-- Resolve on the Y axis
			if player.yV > 0 then
				-- Player was falling downwards. Resolve upwards.
				player.y = platform.y - player.height
				player.yV = 0
				-- The Player is on the ground and can jump
				if love.keyboard.isDown("up") then
					player.yV = -5
				end
			else 
				-- Player was moving upwards. Resolve downwards
				player.y = platform.y + platform.height
				player.yV = 0
			end
		elseif aabb_y_check(player:previous(), platform) then
			-- Resolve on the X axis
			if player.xV > 0 then
				-- Player was traveling right. Resolve to the left
				player.x = platform.x - player.width
				player.xV = 0
			else
				-- Player was traveling left. Resolve to the right
				player.x = platform.x + platform.width
				player.xV = 0
			end
		end
	end
end
```
Some important things to note!
- The player is only allowed to jump in the case that the collision resolved upwards, out of the ground. 
- The `aabb_y_check` must be done within an `elseif` branch, rather than ending the first if and starting a new if. If this is not done, both resolutions will be ran for every collision, which is not what we want.
- If you are not resetting the player velocity to 0 on the respective axis after collision, you will eventually fall through the platform after your velocity exceeds  the height of the platform, as it will move past the entire platform in a single frame. 
- Double check you are resolving the Y collision when the previous frame was coliding on the **X**, not the Y, and similarily for the X resolution. Counter-intuitively, a collision on one axis in the previous frame means that the new collision is on the opposite axis.

And that is it done! Enjoy your home-made versatile physics engine. 
<video autoplay="" playsinline="" loop="" muted="">
  <source src="/images/completed_the_resolution.mp4" type="video/mp4">
</video>

The sourcecode for this tutorial is publically availble on [Github.](https://github.com/Dot32IsCool/platformer_physics_tutorial)

If you would also like to add circles to your physics engine, check out my [circle versus rectangle collision](https://dot32.netlify.app/tutorials/circle-vs-rectangle-collision) tutorial.

<!-- <span style="text-align: center;display: block;">Published 24nd Jul 2023, last updated 22nd Jul 2023</span> -->

<div id="json">
	{
		"archived": false,
		"author": "Dot32",
		"date": "22nd Jul 2023",
		"edited": "19th Jul 2024",
		"title": "Writing a physics engine to prove it's not hard",
    	"description": "A tutorial on how to write a custom physics engine.",
		"image": "/tutorials/writing-a-physics-engine-to-prove-its-not-hard/thumb.gif"
	}
</div>
