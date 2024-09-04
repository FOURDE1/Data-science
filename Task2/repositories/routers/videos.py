from fastapi import APIRouter
from repositories.database import collection

router = APIRouter(tags=["Videos"])

@router.get("/articles_with_video")
async def articles_with_video():
    result = list(collection.find({"video_duration": {"$ne": None}}))
    return result
