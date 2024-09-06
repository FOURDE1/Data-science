from fastapi import APIRouter
from repositories.database import collection
from datetime import datetime, timedelta
from bson import ObjectId
import logging

router = APIRouter(tags=["Dates"])

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def convert_object_ids(data):
    """
    Recursively converts ObjectId fields in a dictionary or list of dictionaries to strings.

    Args:
        data (dict or list): The data containing ObjectId fields to be converted.

    Returns:
        dict or list: The data with ObjectId fields converted to strings.
    """
    if isinstance(data, list):
        return [convert_object_ids(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_object_ids(value) for key, value in data.items()}
    elif isinstance(data, ObjectId):
        return str(data)
    else:
        return data

@router.get("/articles_by_date")
async def articles_by_date():
    pipeline = [
        {
            "$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$published_time"}},
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}}
    ]
    logger.debug(f"Pipeline for articles_by_date: {pipeline}")
    result = list(collection.aggregate(pipeline))
    logger.debug(f"Result for articles_by_date: {result}")
    return convert_object_ids(result)

@router.get("/articles_by_specific_date/{date}")
async def articles_by_specific_date(date: str):
    try:
        date_obj = datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        return {"error": "Invalid date format. Use YYYY-MM-DD."}

    pipeline = [
        {
            "$match": {
                "published_time": {
                    "$gte": date_obj,
                    "$lt": date_obj + timedelta(days=1)
                }
            }
        }
    ]
    logger.debug(f"Pipeline for articles_by_specific_date: {pipeline}")
    result = list(collection.aggregate(pipeline))
    logger.debug(f"Result for articles_by_specific_date: {result}")
    return convert_object_ids(result)

@router.get("/articles_by_year/{year}")
async def articles_by_year(year: int):
    pipeline = [
        {
            "$match": {
                "$expr": {
                    "$eq": [{"$year": "$published_time"}, year]
                }
            }
        },
        {
            "$group": {
                "_id": {"$year": "$published_time"},
                "count": {"$sum": 1}
            }
        }
    ]
    logger.debug(f"Pipeline for articles_by_year: {pipeline}")
    result = list(collection.aggregate(pipeline))
    logger.debug(f"Result for articles_by_year: {result}")
    return convert_object_ids(result)

@router.get("/articles_by_month/{year}/{month}")
async def articles_by_month(year: int, month: int):
    pipeline = [
        {
            "$match": {
                "$expr": {
                    "$and": [
                        {"$eq": [{"$year": "$published_time"}, year]},
                        {"$eq": [{"$month": "$published_time"}, month]}
                    ]
                }
            }
        },
        {"$group": {"_id": {"$month": "$published_time"}, "count": {"$sum": 1}}}
    ]
    logger.debug(f"Pipeline for articles_by_month: {pipeline}")
    result = list(collection.aggregate(pipeline))
    logger.debug(f"Result for articles_by_month: {result}")
    return convert_object_ids(result)

@router.get("/articles_last_X_hours/{hours}")
async def articles_last_X_hours(hours: int):
    date_threshold = datetime.now() - timedelta(hours=hours)
    pipeline = [
        {"$match": {"published_time": {"$gte": date_threshold}}}
    ]
    logger.debug(f"Pipeline for articles_last_X_hours: {pipeline}")
    result = list(collection.aggregate(pipeline))
    logger.debug(f"Result for articles_last_X_hours: {result}")
    return convert_object_ids(result)
