from fastapi import APIRouter
from repositories.database import collection

router = APIRouter(tags=["Updates"])

@router.get("/articles_updated_after_publication")
async def articles_updated_after_publication():
    pipeline = [
        {"$match": {"$expr": {"$gt": ["$last_updated", "$published_time"]}}}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/most_updated_articles")
async def most_updated_articles():
    pipeline = [
        {"$project": {"update_count": {"$subtract": ["$last_updated", "$published_time"]}}},
        {"$sort": {"update_count": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return result
