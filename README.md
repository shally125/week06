# Where Should I Eat?

A small interactive Python program that helps students choose
a campus canteen.

## Intended User

Students who cannot decide where to eat and want a quick suggestion.

## Available Canteens

- Tai Tai Foodtopia
- Communal Student Canteen
- Gourmet Shop
- The Forest

## Main Interaction

The user asks for a random suggestion, then accepts it,
requests a different canteen, starts again, or quits.

Choosing "Pick another" avoids repeating the previous suggestion.

## Requirements

- Python 3.10 or above
- uv for the setup commands below
- No third-party Python packages

## How to Run

Download the repository and open a terminal in the project folder.

```bash
uv python install 3.12
uv sync
uv run python main.py
```

Alternatively, with Python 3.10 or above already installed:

```bash
python main.py
```

Some systems use `python3` instead of `python`.

## Controls

Follow the numbered menus in the terminal.
Press Ctrl+C at any time to quit.

Blank or invalid menu choices produce a message and allow another attempt.

## Screenshot

![Canteen picker running in a terminal](assets/screenshot.png)

## Known Limitations

- Suggestions are random.
- The program does not check opening hours, prices, distance,
  menus, or dietary requirements.
- The four canteens are fixed in the source code.
- Choices are not saved after the program ends.

## Process and Credits

See PROCESS.md and CREDITS.md.
