from fastapi import APIRouter
from repositories.database import collection

router = APIRouter()

@router.get("/articles_by_language")
async def articles_by_language():
    pipeline = [
        {"$group": {"_id": "$language", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(collection.aggregate(pipeline))
    return result
