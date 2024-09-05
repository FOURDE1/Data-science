from fastapi import APIRouter
from repositories.database import collection
from repositories.utils import convert_object_ids

router = APIRouter(tags=["Articles"])

@router.get("/recent_articles")
async def recent_articles():
    pipeline = [
        {"$sort": {"published_time": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/article_details/{postid}")
async def article_details(postid: str):
    result = collection.find_one({"postid": postid})
    return convert_object_ids(result)

@router.get("/articles_with_video")
async def articles_with_video():
    result = list(collection.find({"video_duration": {"$ne": None}}))
    return convert_object_ids(result)

@router.get("/articles_with_thumbnail")
async def articles_with_thumbnail():
    result = list(collection.find({"thumbnail": {"$ne": None}}))
    return convert_object_ids(result)

@router.get("/articles_containing_text/{text}")
async def articles_containing_text(text: str):
    result = list(collection.find({"content": {"$regex": text}}))
    return convert_object_ids(result)

@router.get("/articles_with_more_than/{word_count}")
async def articles_with_more_than(word_count: int):
    result = list(collection.find({"word_count": {"$gt": word_count}}))
    return convert_object_ids(result)

@router.get("/articles_by_specific_date/{date}")
async def articles_by_specific_date(date: str):
    result = list(collection.find({"published_time": {"$regex": f"^{date}"}}))
    return convert_object_ids(result)

@router.get("/articles_by_coverage/{coverage}")
async def articles_by_coverage(coverage: str):
    result = list(collection.find({"classes": coverage}))
    return convert_object_ids(result)

@router.get("/articles_by_keyword/{keyword}")
async def articles_by_keyword(keyword: str):
    result = list(collection.find({"keywords": keyword}))
    return convert_object_ids(result)

@router.get("/articles_by_year/{year}")
async def articles_by_year(year: int):
    pipeline = [
        {"$match": {"published_time": {"$regex": f"^{year}"}}},
        {"$group": {"_id": {"$year": "$published_time"}, "count": {"$sum": 1}}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/articles_by_month/{year}/{month}")
async def articles_by_month(year: int, month: int):
    pipeline = [
        {"$match": {"published_time": {"$regex": f"^{year}-{str(month).zfill(2)}"}}},
        {"$group": {"_id": {"$month": "$published_time"}, "count": {"$sum": 1}}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/articles_by_word_count_range/{min}/{max}")
async def articles_by_word_count_range(min: int, max: int):
    result = list(collection.find({"word_count": {"$gte": min, "$lte": max}}))
    return convert_object_ids(result)

@router.get("/articles_with_specific_keyword_count/{count}")
async def articles_with_specific_keyword_count(count: int):
    result = list(collection.find({"$expr": {"$eq": [{"$size": "$keywords"}, count]}}))
    return convert_object_ids(result)

@router.get("/articles_last_X_hours/{hours}")
async def articles_last_X_hours(hours: int):
    from datetime import datetime, timedelta
    date_threshold = datetime.now() - timedelta(hours=hours)
    result = list(collection.find({"published_time": {"$gte": date_threshold}}))
    return convert_object_ids(result)

@router.get("/longest_articles")
async def longest_articles():
    pipeline = [
        {"$sort": {"word_count": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/shortest_articles")
async def shortest_articles():
    pipeline = [
        {"$sort": {"word_count": 1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)
