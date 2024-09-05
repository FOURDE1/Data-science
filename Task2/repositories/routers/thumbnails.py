from fastapi import APIRouter
from repositories.database import collection

router = APIRouter(tags=["Thumbnails"])

@router.get("/articles_with_thumbnail")
async def articles_with_thumbnail():
    result = list(collection.find({"thumbnail": {"$ne": None}}).limit(100))
    return result
