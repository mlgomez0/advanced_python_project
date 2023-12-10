from fastapi import FastAPI
from src.movie_model import MovieModel
from src.request import Request
from fastapi.middleware.cors import CORSMiddleware

model = MovieModel()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "Module": "Advance Python and Natural Language Processing",
    }


class Item():
    name: str

@app.post("/api/predict")
def predict(request: Request):
    result = model.predict(request.text)
    return {
        "rating": result,
    }