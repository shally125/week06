# Process

The first version was a Python command-line program. It was changed to a static
web page so students can get a suggestion directly in a browser without
installing Python, opening a terminal, or entering canteen names. The choice is
made locally in `script.js`; no login, server, or third-party package is needed.

The interface has three simple states: the starting screen, a suggestion, and
the confirmation. Choosing "Pick another" filters out the current suggestion
before selecting again. "Start again" returns to the opening screen.
