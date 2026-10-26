# Process

The first version was a Python command-line program. It was changed to a static
web page so students can get a suggestion directly in a browser without
installing Python, opening a terminal, or entering canteen names. The choice is
made locally in `script.js`; no login, server, or third-party package is needed.

The interface has three simple states: the starting screen, a suggestion, and
the confirmation. Choosing "Pick another" filters out the current suggestion
before selecting again. "Start again" returns to the opening screen.

## User Trial

A user tried the experience and described it as fun.
They suggested adding sound and animation to make the interaction
more engaging.

This feedback suggested that the basic idea was appealing,
but that the selection process could provide richer feedback.

## Response to the Trial

I added a short animation that cycles through canteen names before
revealing the final suggestion. A light tone accompanies the result
when sound is enabled, and a two-note sound marks confirmation.

Sound is off by default and can be enabled using the
**Sound: Off / On** button. This allows users to decide whether
audio suits their surroundings.

During selection, the decision buttons are temporarily disabled
to prevent overlapping selections caused by repeated clicks.
The animation lasts approximately 0.7 seconds.

For users whose system requests reduced motion, the program skips
the selection animation and displays the result immediately.

These changes respond to the user's request for a more playful
experience while preserving the original selection loop.
Sound supports the visual feedback; it is not required to understand
or use the program.

## Verification After the Change

I tested the picker in a browser: selecting a canteen, choosing another
suggestion, confirming it, and resetting to the start screen. I also checked
that sound could be turned on and off, that the selection buttons were
disabled during the animation when repeated clicks were attempted, and that
the result appeared immediately with reduced motion enabled. The alternate
suggestion differed from the previous selection.

No second user trial has been recorded.

# AI use

AI initially suggested allowing users to enter their own cafeteria names. I modified this suggestion by fixing the option to four designated cafeterias to reduce input steps and make the tool fit my own usage scenario.
I used AI to assist me in writing the webpage code, and helped convert the webpage from local deployment to a publicly accessible version.

## AI Assistance During the Revision

I used ChatGPT/Codex to suggest an implementation for the user's
request for sound and animation.

I kept the suggestion to generate short tones in the browser,
which avoided adding external audio files.

I adapted the sound-and-motion idea by keeping audio optional
and preserving clear text feedback. The implementation also skips
animation when the user's system requests reduced motion.

I reviewed the changes in the browser and tested selection, another
suggestion, confirmation, reset, sound on and off, rapid clicks during
selection, and the reduced-motion behavior.
