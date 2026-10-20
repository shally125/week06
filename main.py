import random

CANTEENS = [
    "Tai Tai Foodtopia",
    "Communal Student Canteen",
    "Gourmet Shop",
    "The Forest",
]


def show_canteens():
    """Display the available canteens."""
    print("\nAvailable canteens:")

    for number, canteen in enumerate(CANTEENS, start=1):
        print(f"{number}. {canteen}")


def choose_canteen(previous=None):
    """Choose a canteen without repeating the previous suggestion."""
    options = [
        canteen for canteen in CANTEENS
        if canteen != previous
    ]

    return random.choice(options)


def main():
    print("=== Where Should I Eat? ===")
    print("Choose a place for your next meal.")
    print("Press Ctrl+C at any time to quit.")

    show_canteens()

    selected = None

    while True:
        if selected is None:
            print("\n1. Pick a canteen")
            print("2. Quit")

            action = input("Enter 1 or 2: ").strip()

            if action == "1":
                selected = choose_canteen()

            elif action == "2":
                print("\nGoodbye!")
                return

            else:
                print("\nInvalid choice. Please enter 1 or 2.")

        else:
            print(f"\nYour suggestion: {selected}")
            print("1. I'll eat here")
            print("2. Pick another")
            print("3. Start again")
            print("4. Quit")

            action = input("Enter 1, 2, 3, or 4: ").strip()

            if action == "1":
                print(f"\nYou chose {selected}. Enjoy your meal!")
                return

            elif action == "2":
                selected = choose_canteen(selected)
                print("\nA different canteen has been selected.")

            elif action == "3":
                selected = None
                print("\nSelection cleared. Let's start again.")
                show_canteens()

            elif action == "4":
                print("\nGoodbye!")
                return

            else:
                print(
                    "\nInvalid choice. "
                    "Please enter 1, 2, 3, or 4."
                )


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        print("\nSession ended. Goodbye!")
