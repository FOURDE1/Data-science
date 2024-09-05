from fastapi import APIRouter
from repositories.database import collection
from repositories.utils import convert_object_ids
from datetime import datetime, timedelta

router = APIRouter(tags=["Dates"])

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
    return convert_object_ids(result)

@router.get("/articles_by_specific_date/{date}")
async def articles_by_specific_date(date: str):
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
        {"$match": {"published_time": {"$regex": f"^{date}"}}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/articles_by_year/{year}")
async def articles_by_year(year: int):
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
        {"$match": {"$expr": {"$eq": [{"$year": "$published_time"}, year]}}},
        {"$group": {"_id": {"$year": "$published_time"}, "count": {"$sum": 1}}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/articles_by_month/{year}/{month}")
async def articles_by_month(year: int, month: int):
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
        {"$match": {"$expr": {"$and": [{"$eq": [{"$year": "$published_time"}, year]}, {"$eq": [{"$month": "$published_time"}, month]}]}}},
        {"$group": {"_id": {"$month": "$published_time"}, "count": {"$sum": 1}}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)

@router.get("/articles_last_X_hours/{hours}")
async def articles_last_X_hours(hours: int):
    date_threshold = datetime.now() - timedelta(hours=hours)
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
        {"$match": {"published_time": {"$gte": date_threshold}}}
    ]
    result = list(collection.aggregate(pipeline))
    return convert_object_ids(result)
