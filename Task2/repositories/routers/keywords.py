from fastapi import APIRouter
from repositories.database import collection

router = APIRouter(tags=["Keywords"])

@router.get("/top_keywords")
async def top_keywords():
    pipeline = [
        {"$unwind": "$keywords"},
        {"$group": {"_id": "$keywords", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/popular_keywords_last_X_days/{days}")
async def popular_keywords_last_X_days(days: int):
    from datetime import datetime, timedelta
    date_threshold = datetime.now() - timedelta(days=days)
    pipeline = [
        {"$match": {"published_time": {"$gte": date_threshold}}},
        {"$unwind": "$keywords"},
        {"$group": {"_id": "$keywords", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return result
