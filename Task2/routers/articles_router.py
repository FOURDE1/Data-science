from fastapi import APIRouter, Depends
from typing import List, Dict
from repositories.articles_repository import ArticlesRepository
from database import Database
from pydantic import BaseModel
from models import ArticlesByAuthorResponse

router = APIRouter()

def get_articles_repository() -> ArticlesRepository:
    database = Database()
    collection = database.get_collection("articles")
    return ArticlesRepository(collection)

@router.get("/top_keywords", response_model=List[Dict])
def top_keywords(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_top_keywords()

@router.get("/top_authors", response_model=List[Dict])
def top_authors(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_top_authors()

@router.get("/articles_by_date", response_model=List[Dict])
def articles_by_date(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_date()

@router.get("/articles_by_word_count", response_model=List[Dict])
def articles_by_word_count(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_word_count()

@router.get("/articles_by_language", response_model=List[Dict])
def articles_by_language(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_language()

@router.get("/articles_by_classes", response_model=List[Dict])
def articles_by_classes(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_classes()

@router.get("/recent_articles", response_model=List[Dict])
def recent_articles(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_recent_articles()

class Article(BaseModel):
    _id: str
    title: str
    postid: str
    word_count: int
    url: str
    keywords: List[str]

class ArticlesResponse(BaseModel):
    total_count: int
    articles: List[Article]

@router.get("/articles_by_keyword/{keyword}", response_model=ArticlesResponse)
def articles_by_keyword(keyword: str, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_keyword(keyword)

@router.get("/articles_by_author/{author_name}", response_model=ArticlesByAuthorResponse)
def articles_by_author(author_name: str, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_author(author_name)

@router.get("/top_classes", response_model=List[Dict])
def top_classes(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_top_classes()

@router.get("/article_details/{postid}", response_model=Dict)
def article_details(postid: str, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_article_details(postid)

@router.get("/articles_with_video", response_model=List[Dict])
def articles_with_video(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_with_video()

@router.get("/articles_by_year/{year}", response_model=List[Dict])
def articles_by_year(year: int, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_year(year)

@router.get("/longest_articles", response_model=List[Dict])
def longest_articles(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_longest_articles()

@router.get("/shortest_articles", response_model=List[Dict])
def shortest_articles(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_shortest_articles()

@router.get("/articles_by_keyword_count", response_model=List[Dict])
def articles_by_keyword_count(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_keyword_count()

@router.get("/articles_with_thumbnail", response_model=List[Dict])
def articles_with_thumbnail(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_with_thumbnail()

@router.get("/articles_updated_after_publication", response_model=List[Dict])
def articles_updated_after_publication(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_updated_after_publication()

@router.get("/articles_by_coverage/{coverage}", response_model=List[Dict])
def articles_by_coverage(coverage: str, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_coverage(coverage)

@router.get("/popular_keywords_last_x_days/{days}", response_model=List[Dict])
def popular_keywords_last_x_days(days: int, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_popular_keywords_last_x_days(days)

@router.get("/articles_by_month/{year}/{month}", response_model=List[Dict])
def articles_by_month(year: int, month: int, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_month(year, month)

@router.get("/articles_by_word_count_range/{min_count}/{max_count}", response_model=Dict)
def articles_by_word_count_range(min_count: int, max_count: int, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_word_count_range(min_count, max_count)

@router.get("/articles_with_specific_keyword_count/{count}", response_model=List[Dict])
def articles_with_specific_keyword_count(count: int, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_with_specific_keyword_count(count)

@router.get("/articles_by_specific_date/{date}", response_model=List[Dict])
def articles_by_specific_date(date: str, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_specific_date(date)

@router.get("/articles_containing_text/{text}", response_model=List[Dict])
def articles_containing_text(text: str, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_containing_text(text)

@router.get("/articles_with_more_than/{word_count}", response_model=List[Dict])
def articles_with_more_than(word_count: int, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_with_more_than(word_count)

@router.get("/articles_grouped_by_coverage", response_model=List[Dict])
def articles_grouped_by_coverage(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_grouped_by_coverage()

@router.get("/articles_last_x_hours/{hours}", response_model=List[Dict])
def articles_last_x_hours(hours: int, articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_last_x_hours(hours)

@router.get("/articles_by_title_length", response_model=List[Dict])
def articles_by_title_length(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_articles_by_title_length()

@router.get("/most_updated_articles", response_model=List[Dict])
def most_updated_articles(articles_repo: ArticlesRepository = Depends(get_articles_repository)):
    return articles_repo.get_most_updated_articles()
