# Keep The Ball Inside
![Preview](https://github.com/Sonnyyy77/abc-student-repo/blob/master/projects/project-C/i_gif.GIF)

## Description
Keep The Ball Inside is a multiplayer game that allows up to four players to play together. The game is inspired by the classic game *"Breakout"*. Players need to keep the ball in the middle of the “playground" by moving their paddle. In one-player mode, players will bounce the ball with three walls. Every time an additional player appears, one of the walls will turn into a paddle. Each player will control the paddle relatively on the bottom of their screen to bounce the ball.  The first player to enter will control the start and restart of the game.

## Challenges
It went smoothly when I made the single-player mode. However, there were many challenges occurred when building the multiplayer mode, including each player’s control of the paddle, the orientation of the page for each player, the position data transmission, and the resizing of the canvas.

## Solutions & Compromises
For the data transmission, I used socket.io to emit and receive the data. To solve the problems above, I created an array to store each online player’s ID. Based on their order in the array, I assigned them with different paddles to replace different walls. For different players, I also changed their canvas orientation differently. For the position data, at first I emitted the position to every player through socket. However, as I used Glitch to test, I found that when I moved the paddle, it kept flashing back to its original position. After I asked Leon for help, he showed me that the problem occurred because players also send their original position to themselves as well. Therefore, to solve this issue, the position data should only be sent to other players except themselves. As for the resizing problem, Leon also helped me solve it by using CSS parameters to always center the canvas on the page and a resize function to keep the canvas resize in the same proportion while resizing the window.

## Future Steps
To ensure that the ball position is relatively the same for each player, I set the speed of the ball movement very slow, which sometimes gets a little boring after playing for a long time. In the future, I will make the speed of ball movement faster as the number of bounces increases. I also want to turn this game into a survival game, where one player is eliminated each round and the player who plays to the end wins.

Live site for [Keep The Ball Inside](https://sonny-breakout-test2.glitch.me/)
