from fastapi import FastAPI
from src.movie_model import MovieModel
from src.climate_change_model import ClimateChangeModel
from src.request import Request
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from datetime import datetime
import calendar

movie_model = MovieModel()
climate_change_model = ClimateChangeModel()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_date_parts(value: datetime):
    
    # Extract parts
    year = value.year
    month = value.month
    day = value.day
    hour = value.hour

    # Determine if it is weekend
    is_weekend = value.weekday() > 4

    # Determine part of the day
    if 5 <= hour < 12:
        time_of_day = 'Morning'
    elif 12 <= hour < 17:
        time_of_day = 'Afternoon'
    elif 17 <= hour < 21:
        time_of_day = 'Evening'
    else:
        time_of_day = 'Night'

    data = {
        'Year': [year],
        'Month': [month],
        'Day': [day],
        'Hour': [hour],
        'TimeOfDay': [time_of_day],
        'IsWeekend': [is_weekend]
    }

    return data

@app.get("/")
def read_root():
    return {
        "Module": "Advance Python and Natural Language Processing",
    }

@app.post("/api/predict")
def predict(request: Request):

    post_date = datetime(2019, 2, 14, 15, 0) 
    date_parts = get_date_parts(post_date)
    input_data = {
        'Title': [request.text],
        'Subreddit': [request.subreddit],
        'IsSelfText': [True],
        'Sentiment_hf': ["negative"],
        'Year': date_parts['Year'],
        'Month': date_parts['Month'],
        'Day': date_parts['Day'],
        'Hour': date_parts['Hour'],
        'TimeOfDay': date_parts['TimeOfDay'],
        'IsWeekend': date_parts['IsWeekend']
    }

    input_data_df = pd.DataFrame(input_data)
    result = climate_change_model.predict(input_data_df)
    return {
        "rating": result,
    }