from fastapi import APIRouter
from repositories.database import collection
from repositories.utils import convert_object_ids

router = APIRouter(tags=["Videos"])

@router.get("/articles_with_video")
async def articles_with_video():
    result = list(collection.find({"video_duration": {"$ne": None}}))
    return convert_object_ids(result)
