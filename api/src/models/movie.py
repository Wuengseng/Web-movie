from pydantic import BaseModel, Field
from typing import List, Optional

class Episode(BaseModel):
    id: int
    title: str
    duration: str

class Movie(BaseModel):
    id: Optional[int] = None
    title: str
    poster: str
    backdrop: str
    year: int
    rating: float
    duration: str
    type: str
    director: str
    cast: List[str]
    genre: List[str]
    overview: str
    trailerUrl: Optional[str] = None
    episodes: Optional[List[Episode]] = None
