# Custom Platformer Physics

Build physics for your platformer without using any libraries
or the [inbuilt physics module](https://love2d.org/wiki/love.physics).

![thumb.gif](/tutorials/thumb.gif)

First, we want to create a yV variable for our player; a variable to keep track of the Y velocity. For every in-game frame, we want to add our "gravity" force to our velocity. I usually keep the gravity strength at 1. We also want to be updating the players Y position by their previous Y + the yV.
Example code to be run every frame:

```lua
player.yV = player.yV + 1
player.y = player.y - player.yV
```

The velocity will be increasing by 1 each frame, and the player will fall at the velocity each frame, creating an exceleration and conservation of motion.

Now we would like to build the floor collision, and this requires knowing a little about aabb interception!

if you dont know what aabb is, click [here](https://dot32.netlify.app/tutorials/custom-platformer-physics/aabb) to see more about what it is. Now of course, we would like to stop our player from falling through floors. As we are only focusing on the Y velocity and positions at this point, we actually only want to detect aabb for the Y axis; All X axis code will be seperate.

When the player goes within the floor, we first want to move the player out from inside the floor, and then we want to reset the player's Y velocity.

If we dont move the player out from the floor, they will appear to just slowly sink into it (as gravity will still take effect every frame)

If we dont reset the Y velocity upon landing, the player will continue to gain "speed" while being statioinary on the floor, and eventually the player will be moving so fast that they just pass through the floor.

If the player is moving at 300 pixels per frame, and the floor platform is only 10 pixels high, the player will zoom right past it, and the aabb collision will never be able to bring it up out of the floor.

To pull the player out of the floor, a very simple sollution is to move it by the reverse of its velocity.

Just by being in the floor, we imply that this is the first frame we have been here; in the previous frame we were obviously not inside the floor, or else we would have collided in that frame. Every frame we move by our velocity, so if we move our player by the reverse of its veloicity, it will be in the same place it had previously occupied the frame before!

And obviously, resetting the the Y velocity is as simple as `player.yV = 0`.
Our entire detection code looks like this:

```lua
if player.y < floor.y + floor.height
and player.y + player.height > floor.y
then
	player.y = player.y - player.yV
	player.y = 0
end
```

This code should be run after updating the Y position/velocity for the player each frame.

Sweet! Now we should have entirely functional floor VS player code! The next step is now obviously to add similar functionality to the X axis.

Start out by again creating a velocity variable, this time for the X axis. Unlike the Y axis, we will not be applying a gravity force, instead will apply a positive force when the player holds the right key, and a negative force when the player holds the left key. Also as we do not want our player to accelerate forever, we have to give them some friction, which i usually write as
`player.xV = player.xV*0.9`; making the player 10% slower each frame.


After this, you can effectively copy paste the code for the Y axis, just swap all appearences of y with x and swap all appearences of height with width.

Full code is written below:

```lua
--run every frame

player.yV = player.yV + 1
player.y = player.y + player.yV

if player.y < floor.y + floor.height
and player.y + player.height > floor.y
then
	player.y = player.y - player.yV
	player.yV = 0

	--set yV to a set value to initiate a jump
	if love.keyboard.isDown("up") then
	 	player.yV = 15
	end
end

if love.keyboard.isDown("right") then
	player.xV = player.xV + 1
end
if love.keyboard.isDown("left")r>
	player.xV = player.xV - 1
end

player.xV = player.xV * 0.9
player.x = player.x + player.xV

if player.x < floor.x + floor.width
and player.x + player.width > floor.x
then
	player.x = player.x - player.xV
	player.xV = 0
end
```

As you can see, i added some code in the Y collision section to jump. This means that when you are colliding with the ground, you can press up arrow to jump!

Something to note is that while each section has to be together, you can change their order freely. You can do all the Y calculations first and then calulate the X, or you can do all the X caculations first and caclulate the Y, it doesn't really matter. For this tutorial i chose to explain the Y axis first as gravity is a nice first accomplishment to reach.

`Written by Dot32`
`18th Jan 2021`

<json-data>
	{
		"archived": true,
		"author": "Dot32",
		"date": "18th Jan 2021"
	}
</json-data>