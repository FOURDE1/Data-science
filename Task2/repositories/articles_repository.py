from pymongo.collection import Collection
from typing import List, Dict
from bson import ObjectId
from datetime import datetime, timedelta
from typing import Any

class ArticlesRepository:
    def __init__(self, collection: Collection):
        self.collection = collection

    def get_top_keywords(self, limit: int = 10) -> List[Dict]:
        pipeline = [
            {"$unwind": "$keywords"},
            {"$group": {"_id": "$keywords", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": limit}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_top_authors(self, limit: int = 10) -> List[Dict]:
        pipeline = [
            {"$group": {"_id": "$author", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": limit}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_articles_by_date(self) -> List[Dict]:
        pipeline = [
            {"$group": {"_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$published_time"}}, "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_articles_by_word_count(self) -> List[Dict]:
        pipeline = [
            {"$group": {"_id": "$word_count", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_articles_by_language(self) -> List[Dict]:
        pipeline = [
            {"$group": {"_id": "$lang", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_articles_by_classes(self) -> List[Dict]:
        pipeline = [
            {"$unwind": "$classes"},
            {"$group": {"_id": "$classes.value", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_recent_articles(self, limit: int = 10) -> List[Dict]:
        pipeline = [
            {"$sort": {"published_time": -1}},
            {"$limit": limit}
        ]
        articles = list(self.collection.aggregate(pipeline))
        return [self._convert_bson_to_json(article) for article in articles]


    def get_articles_by_keyword(self, keyword: str) -> Dict[str, Any]:
        query = {"keywords": {"$regex": f".*{keyword}.*", "$options": "i"}}
        projection = {"_id": 1, "title": 1, "postid": 1, "word_count": 1, "url": 1, "keywords": 1}
        total_count = self.collection.count_documents(query)
        articles = list(self.collection.find(query, projection).limit(200))

  
        for article in articles:
            if isinstance(article.get('keywords'), str):
                article['keywords'] = article['keywords'].split(',')

        return {"total_count": total_count, "articles": articles}

    def get_articles_by_author(self, author_name: str) -> List[Dict]:
        query = {"author": author_name}
        articles = list(self.collection.find(query))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_top_classes(self, limit: int = 10) -> List[Dict]:
        pipeline = [
            {"$unwind": "$classes"},
            {"$group": {"_id": "$classes.value", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": limit}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_article_details(self, postid: str) -> Dict:
        query = {"postid": postid}
        article = self.collection.find_one(query)
        return self._convert_bson_to_json(article)

    def get_articles_with_video(self) -> List[Dict]:
        query = {"video_duration": {"$ne": None}}
        articles = list(self.collection.find(query))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_by_year(self, year: int) -> List[Dict]:
        start_date = datetime(year, 1, 1)
        end_date = datetime(year + 1, 1, 1)
        pipeline = [
            {"$match": {"published_time": {"$gte": start_date, "$lt": end_date}}},
            {"$group": {"_id": {"$year": "$published_time"}, "count": {"$sum": 1}}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_longest_articles(self, limit: int = 10) -> List[Dict]:
        pipeline = [
            {"$sort": {"word_count": -1}},
            {"$limit": limit}
        ]
        articles = list(self.collection.aggregate(pipeline))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_shortest_articles(self, limit: int = 10) -> List[Dict]:
        pipeline = [
            {"$sort": {"word_count": 1}},
            {"$limit": limit}
        ]
        articles = list(self.collection.aggregate(pipeline))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_by_keyword_count(self) -> List[Dict]:
        pipeline = [
            {"$addFields": {"keywords_array": {"$split": ["$keywords", ","]}}},
            {"$project": {"keyword_count": {"$size": {"$ifNull": ["$keywords_array", []]}}}},
            {"$group": {"_id": "$keyword_count", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_articles_with_thumbnail(self) -> List[Dict]:
        query = {"thumbnail": {"$ne": ""}}
        projection = {"_id": 1, "title": 1, "thumbnail": 1}
        articles = list(self.collection.find(query, projection))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_updated_after_publication(self) -> List[Dict]:
        query = {"$expr": {"$gt": ["$last_updated", "$published_time"]}}
        projection = {"_id": 1, "title": 1, "last_updated": 1, "published_time": 1}
        articles = list(self.collection.find(query, projection))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_by_coverage(self, coverage: str) -> List[Dict]:
        query = {"classes.value": coverage}
        articles = list(self.collection.find(query))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_popular_keywords_last_x_days(self, days: int = 7) -> List[Dict]:
        start_date = datetime.utcnow() - timedelta(days=days)
        pipeline = [
            {"$match": {"published_time": {"$gte": start_date}}},
            {"$unwind": "$keywords"},
            {"$group": {"_id": "$keywords", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_articles_by_month(self, year: int, month: int) -> List[Dict]:
        start_date = datetime(year, month, 1)
        if month == 12:
            end_date = datetime(year + 1, 1, 1)
        else:
            end_date = datetime(year, month + 1, 1)
        pipeline = [
            {"$match": {"published_time": {"$gte": start_date, "$lt": end_date}}},
            {"$group": {"_id": {"$month": "$published_time"}, "count": {"$sum": 1}}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_articles_by_word_count_range(self, min_count: int, max_count: int) -> Dict:
        pipeline = [
            {"$match": {"word_count": {"$gte": min_count, "$lte": max_count}}},
            {"$count": "article_count"}
        ]
        result = list(self.collection.aggregate(pipeline))
        return result[0] if result else {"article_count": 0}

    def get_articles_with_specific_keyword_count(self, count: int) -> List[Dict]:
        pipeline = [
            {"$addFields": {"keywords_array": {"$split": ["$keywords", ","]}}},
            {"$project": {"keyword_count": {"$size": {"$ifNull": ["$keywords_array", []]}}}},
            {"$match": {"keyword_count": count}}
        ]
        articles = list(self.collection.aggregate(pipeline))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_by_specific_date(self, date: str) -> List[Dict]:
        start_date = datetime.strptime(date, "%Y-%m-%d")
        end_date = start_date + timedelta(days=1)
        query = {"published_time": {"$gte": start_date, "$lt": end_date}}
        articles = list(self.collection.find(query))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_containing_text(self, text: str) -> List[Dict]:
        query = {"$text": {"$search": text}}
        projection = {"_id": 1, "title": 1, "description": 1}
        articles = list(self.collection.find(query, projection))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_with_more_than(self, word_count: int) -> List[Dict]:
        query = {"word_count": {"$gt": word_count}}
        articles = list(self.collection.find(query))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_grouped_by_coverage(self) -> List[Dict]:
        pipeline = [
            {"$unwind": "$classes"},
            {"$group": {"_id": "$classes.value", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_articles_last_x_hours(self, hours: int) -> List[Dict]:
        start_date = datetime.utcnow() - timedelta(hours=hours)
        query = {"published_time": {"$gte": start_date}}
        articles = list(self.collection.find(query))
        return [self._convert_bson_to_json(article) for article in articles]

    def get_articles_by_title_length(self) -> List[Dict]:
        pipeline = [
            {"$project": {"title_length": {"$size": {"$split": ["$title", " "]}}}},
            {"$group": {"_id": "$title_length", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]
        return list(self.collection.aggregate(pipeline))

    def get_most_updated_articles(self, limit: int = 10) -> List[Dict]:
        pipeline = [
            {"$project": {"update_count": {"$subtract": ["$last_updated", "$published_time"]}}},
            {"$sort": {"update_count": -1}},
            {"$limit": limit}
        ]
        articles = list(self.collection.aggregate(pipeline))
        return [self._convert_bson_to_json(article) for article in articles]

    def _convert_bson_to_json(self, article: Dict) -> Dict:
        if "_id" in article and isinstance(article["_id"], ObjectId):
            article["_id"] = str(article["_id"])
        if "published_time" in article and isinstance(article["published_time"], datetime):
            article["published_time"] = article["published_time"].isoformat()
        if "last_updated" in article and isinstance(article["last_updated"], datetime):
            article["last_updated"] = article["last_updated"].isoformat()
        return article

    def _convert_bson_to_json_for_keyword(self, article: Dict) -> Dict:
        return {
            "title": article.get("title"),
            "article_id": str(article["_id"]),
            "postid": article.get("postid"),
            "url": article.get("url"),  # Corrected field name
            "article_keywords": article.get("keywords"),
            "wordCount": article.get("word_count")  # Include the word_count field
        }

