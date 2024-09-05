from fastapi import APIRouter
from repositories.database import collection
from repositories.utils import convert_object_ids

router = APIRouter(tags=["Languages"])

@router.get("/articles_by_language")
async def articles_by_language():
    pipeline = [
        {"$group": {"_id": "$language", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)
