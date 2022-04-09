# Bevy Fixed Update
If you're anything like me, you may been wondering how to set fixed update inside of [Bevy](https://bevyengine.org/). By default, Bevy runs every system just before drawing to the screen. This means on a 60hz monitor your games physics could be running at 60fps, and on a 120hz monitor, 120fps. Variances in update framerate can be problematic, as you probably don't want movement twice as fast or gravity twice as strong when playing on different monitors. 

It turns out Bevy has built in fixed update features, but when googling I found little resources on the topic, so I decided to write this incredibly breif tutorial.

![tank shooting bullets](/tutorials/bevy-fixed-update/thumb.gif)

So, it turns out having systems run as fixed update is as simple as this:
```rust
use bevy::prelude::*;
use bevy::core::FixedTimestep;

const TIME_STEP: f32 = 1.0 / 120.0;

fn main() {
    App::new()
	    .add_plugins(DefaultPlugins)
	    .add_startup_system(setup_camera)
	    .add_startup_system(create_player)
	    .add_system(normal_system)
	    .add_system_set(
	            SystemSet::new()
	                .with_run_criteria(FixedTimestep::step(TIME_STEP as f64))
	                .with_system(update_player)
	        )
	    .run();
}
```
Your standard systems go after `App::new()` as usual, but your framerate dependant systems go into the fixed timestep system set.
Just make sure to use `bevy::core::FixedTimestep` and you're good to go!

Good luck on your further Bevy adventures ✨

<div id="json">
	{
		"author": "Dot32",
		"date": "9th Apr 2022",
		"edited": "9th Apr 2022",
		"title": "Fixed Update in Bevy",
		"description": "See how to use Bevy's fixed update feature in this breif tutorial",
		"image": "/tutorials/bevy-fixed-update/thumb.gif"
	}
</div>