from fastapi import APIRouter
from repositories.database import collection

router = APIRouter()

@router.get("/articles_by_word_count")
async def articles_by_word_count():
    pipeline = [
        {"$group": {"_id": "$word_count", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/articles_by_word_count_range/{min}/{max}")
async def articles_by_word_count_range(min: int, max: int):
    result = list(collection.find({"word_count": {"$gte": min, "$lte": max}}))
    return result

@router.get("/longest_articles")
async def longest_articles():
    pipeline = [
        {"$sort": {"word_count": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/shortest_articles")
async def shortest_articles():
    pipeline = [
        {"$sort": {"word_count": 1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/articles_with_specific_keyword_count/{count}")
async def articles_with_specific_keyword_count(count: int):
    result = list(collection.find({"$expr": {"$eq": [{"$size": "$keywords"}, count]}}))
    return result

@router.get("/articles_with_more_than/{word_count}")
async def articles_with_more_than(word_count: int):
    result = list(collection.find({"word_count": {"$gt": word_count}}))
    return result
