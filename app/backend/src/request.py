from pydantic import BaseModel
from datetime import datetime

class Request(BaseModel):
    text: str
    subreddit: str
    date: datetime