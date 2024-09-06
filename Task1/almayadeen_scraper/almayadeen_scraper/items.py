import scrapy
from datetime import datetime

class ArticleItem(scrapy.Item):
    type = scrapy.Field()
    postid = scrapy.Field()
    title = scrapy.Field()
    url = scrapy.Field()
    keywords = scrapy.Field()
    thumbnail = scrapy.Field()
    video_duration = scrapy.Field()
    word_count = scrapy.Field(serializer=int)
    lang = scrapy.Field()
    published_time = scrapy.Field(serializer=lambda x: datetime.fromisoformat(x.replace('Z', '+00:00')))
    last_updated = scrapy.Field(serializer=lambda x: datetime.fromisoformat(x.replace('Z', '+00:00')))
    description = scrapy.Field()
    author = scrapy.Field()
    classes = scrapy.Field()
    html = scrapy.Field()
    lite_url = scrapy.Field()
