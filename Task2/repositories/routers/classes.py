from fastapi import APIRouter
from repositories.database import collection
from repositories.utils import convert_object_ids

router = APIRouter(tags=["Classes"])

@router.get("/articles_by_classes")
async def articles_by_classes():
    pipeline = [
        {"$unwind": "$classes"},
        {"$group": {"_id": "$classes", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/top_classes")
async def top_classes():
    pipeline = [
        {"$unwind": "$classes"},
        {"$group": {"_id": "$classes", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/articles_grouped_by_coverage")
async def articles_grouped_by_coverage():
    pipeline = [
        {"$unwind": "$classes"},
        {"$group": {"_id": "$classes", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)
