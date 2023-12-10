import random

class MovieModel():

    def __init__(self) -> None:
        pass

    def predict(self, text: str) -> int:

        return random.randint(1, 3)