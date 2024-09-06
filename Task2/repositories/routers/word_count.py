from fastapi import APIRouter
from repositories.database import collection

router = APIRouter(tags=["Word Count"])

@router.get("/articles_by_word_count")
async def articles_by_word_count():
    # Convert word_count to integer and group by it
    pipeline = [
        {"$match": {"word_count": {"$type": "string"}}},  # Ensure word_count is a string
        {"$addFields": {"word_count_int": {"$toInt": "$word_count"}}},  # Convert to integer
        {"$group": {"_id": "$word_count_int", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/articles_by_word_count_range/{min}/{max}")
async def articles_by_word_count_range(min: int, max: int):
    # Convert word_count to integer in the query using aggregation pipeline
    pipeline = [
        {"$match": {"word_count": {"$type": "string"}}},  # Ensure word_count is a string
        {"$addFields": {"word_count_int": {"$toInt": "$word_count"}}},  # Convert to integer
        {"$match": {
            "$and": [
                {"word_count_int": {"$gte": min}},
                {"word_count_int": {"$lte": max}}
            ]
        }},
        {"$group": {"_id": "$word_count_int", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/longest_articles")
async def longest_articles():
    # Convert word_count to integer and sort
    pipeline = [
        {"$addFields": {"word_count_int": {"$toInt": "$word_count"}}},  # Convert to integer
        {"$sort": {"word_count_int": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/shortest_articles")
async def shortest_articles():
    # Convert word_count to integer and sort
    pipeline = [
        {"$addFields": {"word_count_int": {"$toInt": "$word_count"}}},  # Convert to integer
        {"$sort": {"word_count_int": 1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/articles_with_specific_keyword_count/{count}")
async def articles_with_specific_keyword_count(count: int):
    # Ensure keywords is treated as an array
    result = list(collection.find({"$expr": {"$eq": [{"$size": {"$split": ["$keywords", ","]}}, count]}}))
    return result

@router.get("/articles_with_more_than/{word_count}")
async def articles_with_more_than(word_count: int):
    # Convert word_count to integer and perform comparison
    result = list(collection.find({
        "$expr": {"$gt": [{"$toInt": "$word_count"}, word_count]}
    }))
    return result
