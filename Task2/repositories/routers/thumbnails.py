from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import APIRouter, Query, HTTPException

router = APIRouter(tags=["Thumbnails"])

# Initialize the MongoDB client
try:
    client = AsyncIOMotorClient("mongodb://localhost:27017", serverSelectionTimeoutMS=5000)
    db = client["almayadeen"]
    collection = db["articles"]
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")

@router.get("/articles_with_thumbnail")
async def articles_with_thumbnail(page: int = Query(1, ge=1), page_size: int = Query(10, ge=1)):
    try:
        # Calculate the number of documents to skip for pagination
        skip = (page - 1) * page_size

        # Fetch articles that have a thumbnail, returning only the 'title' field
        cursor = collection.find({"thumbnail": {"$ne": None}}, {"_id": 0, "title": 1}).skip(skip).limit(page_size)

        # Convert the cursor to a list asynchronously
        articles = await cursor.to_list(length=page_size)

        # Extract the titles from the articles
        titles = [article["title"] for article in articles]

        return titles

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching articles: {str(e)}")
