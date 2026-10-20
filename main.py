import random

CANTEENS = [
    "Tai Tai Foodtopia",
    "Communal Student Canteen",
    "Gourmet Shop",
    "The Forest",
]

print("=== Where Should I Eat? ===")
print("\nAvailable canteens:")

for number, canteen in enumerate(CANTEENS, start=1):
    print(f"{number}. {canteen}")

input("\nPress Enter to get a suggestion...")

selected = random.choice(CANTEENS)

print(f"\nYour suggestion: {selected}")
