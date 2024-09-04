from fastapi import APIRouter
from repositories.database import collection

router = APIRouter()

@router.get("/articles_by_date")
async def articles_by_date():
    pipeline = [
        {
            "$addFields": {
                "published_time": {
                    "$cond": {
                        "if": {"$eq": [{"$type": "$published_time"}, "string"]},
                        "then": {"$dateFromString": {"dateString": "$published_time"}},
                        "else": "$published_time"
                    }
                }
            }
        },
        {
            "$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$published_time"}},
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/articles_by_specific_date/{date}")
async def articles_by_specific_date(date: str):
    result = list(collection.find({"published_time": {"$regex": f"^{date}"}}))
    return result

@router.get("/articles_by_year/{year}")
async def articles_by_year(year: int):
    pipeline = [
        {"$match": {"published_time": {"$regex": f"^{year}"}}},
        {"$group": {"_id": {"$year": "$published_time"}, "count": {"$sum": 1}}}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/articles_by_month/{year}/{month}")
async def articles_by_month(year: int, month: int):
    pipeline = [
        {"$match": {"published_time": {"$regex": f"^{year}-{str(month).zfill(2)}"}}},
        {"$group": {"_id": {"$month": "$published_time"}, "count": {"$sum": 1}}}
    ]
    result = list(collection.aggregate(pipeline))
    return result

@router.get("/articles_last_X_hours/{hours}")
async def articles_last_X_hours(hours: int):
    from datetime import datetime, timedelta
    date_threshold = datetime.now() - timedelta(hours=hours)
    result = list(collection.find({"published_time": {"$gte": date_threshold}}))
    return result
