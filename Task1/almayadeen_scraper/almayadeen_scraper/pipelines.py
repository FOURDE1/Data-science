import os
import json
from datetime import datetime

class AlmayadeenPipeline:
    def __init__(self):
        self.articles_count = 0
        self.file_paths = {}
        if not os.path.exists('scraped_articles'):
            os.makedirs('scraped_articles')

    def process_item(self, item, spider):
        published_time = item.get('published_time')
        if published_time:
            file_name = f"articles_{published_time.year}_{published_time.month:02d}.json"
        else:
            file_name = "articles_unknown_date.json"

        file_path = os.path.join('scraped_articles', file_name)

        if file_path not in self.file_paths:
            self.file_paths[file_path] = True
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write('[')

        self.save_article(file_path, item)
        self.articles_count += 1
        return item

    def save_article(self, file_path, item):
        # Convert item to dictionary and serialize datetime fields
        item_dict = dict(item)
        if 'published_time' in item_dict and isinstance(item_dict['published_time'], datetime):
            item_dict['published_time'] = item_dict['published_time'].isoformat()
        if 'last_updated' in item_dict and isinstance(item_dict['last_updated'], datetime):
            item_dict['last_updated'] = item_dict['last_updated'].isoformat()

        with open(file_path, 'a', encoding='utf-8') as f:
            if self.articles_count > 0:
                f.write(',\n')
            json.dump(item_dict, f, ensure_ascii=False)

    def close_spider(self, spider):
        for file_path in self.file_paths:
            with open(file_path, 'a', encoding='utf-8') as f:
                f.write(']')
        spider.logger.info(f"Scraped {self.articles_count} articles in total.")
