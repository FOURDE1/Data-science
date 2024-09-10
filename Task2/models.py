from pydantic import BaseModel
from typing import List, Dict

class Article(BaseModel):
    title: str
    postid: str
    author: str
    published_time: str

class ArticlesByAuthorResponse(BaseModel):
    total_count: int
    articles: List[Article]
