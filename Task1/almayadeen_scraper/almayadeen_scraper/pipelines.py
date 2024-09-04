import os
import json
from datetime import datetime

class AlmayadeenPipeline:
    def __init__(self):
        self.articles_count = 0
        self.max_articles = 10000

    def open_spider(self, spider):
        if not os.path.exists('scraped_articles'):
            os.makedirs('scraped_articles')

    def process_item(self, item, spider):
        if self.articles_count >= self.max_articles:
            spider.crawler.engine.close_spider(spider, 'Reached maximum article limit')
            return

        # 3m jeb el date a w 23mol lfile 3la ases el date
        published_time = item.get('published_time')
        if published_time:
            date_obj = datetime.fromisoformat(published_time.replace('Z', '+00:00'))
            file_name = f"articles_{date_obj.year}_{date_obj.month:02d}.json"
        else:
            file_name = "articles_unknown_date.json"

        file_path = os.path.join('scraped_articles', file_name)

        self.save_article(file_path, item)
        self.articles_count += 1
        return item

    def save_article(self, file_path, item):

        with open(file_path, 'a', encoding='utf-8') as f:
            json.dump(item, f, ensure_ascii=False)
            f.write('\n')  

    def close_spider(self, spider):
        spider.logger.info(f"Scraped {self.articles_count} articles in total.")
