from fastapi import APIRouter
from repositories.database import collection
from repositories.utils import convert_object_ids

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
    return convert_object_ids(result)

@router.get("/popular_keywords_last_X_days/{days}")
async def popular_keywords_last_X_days(days: int):
    from datetime import datetime, timedelta
    date_threshold = datetime.now() - timedelta(days=days)
    pipeline = [
        {
            "$addFields": {
                "published_time": {
                    "$cond": {
                        "if": {"$eq": [{"$type": "$published_time"}, "string"]},
                        "then": {"$dateFromString": {"dateString": "$published_time"}},
                        "else": "$published_time"
                    }
                }
            }
        },
        {"$match": {"published_time": {"$gte": date_threshold}}},
        {"$unwind": "$keywords"},
        {"$group": {"_id": "$keywords", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)
