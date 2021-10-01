# Browser Fireflies
![Preview](projects/project-A/Preview.gif)

## Description
This project is intended to mimic a scenario in the forest at night where many fireflies are flying around on your desktop. You can try to catch them and put them into your bottle by clicking those flying popup windows. You can just let them fly freely, and after a while the popup windows will disappear and those fireflies will fly into the main window and live there happily ever after. You only get the chance to catch them at the first 5 seconds they show up on your desktop as a popup window. Once they fly into the main window, you can never catch them again.


## Challenges
There are many difficulties that I encountered when completing this project: (1) to control the images shown on the "bottle" window by clicking the "fireflies" windows, (2) to push new fireflies into the main window after the firefly popups disappear, (3) to keep the fireflies from reappearing in the main window after they have been caught in the bottle and (4) to keep the firefly and bottle windows above the main window all the time so that the user doesn't mistakenly click the main window while playing and let the main window cover both the fireflies and the bottle.

## Solutions & Compromises
I solved the first two challenges with the help of Leon👏. However, I wasn't able to solve the last two challenges due to time constraints. So currently, those fireflies that have already been put into the bottle will also appear in the main window. But I will continue to find solutions to fix this problem. In terms of the fourth challenge, I will try to use focus() to adjust the sequence of the windows so that fireflies and the bottle can always be above the main window.

## Shortcomings
The movement of those fireflies are still not very organic yet, and the current image doesn't quite achieve my initial idea of the fireflies turning into sparkling stars after a while after they've all flown to the main window. I will continue to improve the visual aesthetics and try to implement the ideas I started with.
