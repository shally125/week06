# Process

The first version was a Python command-line program. It was changed to a static
web page so students can get a suggestion directly in a browser without
installing Python, opening a terminal, or entering canteen names. The choice is
made locally in `script.js`; no login, server, or third-party package is needed.

The interface has three simple states: the starting screen, a suggestion, and
the confirmation. Choosing "Pick another" filters out the current suggestion
before selecting again. "Start again" returns to the opening screen.

# AI use

AI initially suggested allowing users to enter their own cafeteria names. I modified this suggestion by fixing the option to four designated cafeterias to reduce input steps and make the tool fit my own usage scenario.
I used AI to assist me in writing the webpage code, and helped convert the webpage from local deployment to a publicly accessible version.
