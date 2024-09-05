from fastapi import APIRouter
from repositories.database import collection
from repositories.utils import convert_object_ids

router = APIRouter(tags=["Authors"])

@router.get("/top_authors")
async def top_authors():
    pipeline = [
        {"$group": {"_id": "$author", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/articles_by_author/{author_name}")
async def articles_by_author(author_name: str):
    result = list(collection.find({"author": author_name}))
    return convert_object_ids(result)
