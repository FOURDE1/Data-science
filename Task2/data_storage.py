import pymongo
import json
import glob
import os
from datetime import datetime
from urllib.parse import urlparse

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["almayadeen"]
collection = db["articles"]

def preprocess_item(item):

    if 'word_count' in item and item['word_count'] is not None:
        item['word_count'] = int(item['word_count'])

    if 'published_time' in item and item['published_time']:
        item['published_time'] = datetime.fromisoformat(item['published_time'].replace('Z', '+00:00'))
    if 'last_updated' in item and item['last_updated']:
        item['last_updated'] = datetime.fromisoformat(item['last_updated'].replace('Z', '+00:00'))

    if 'url' in item and item['url']:
        item['url'] = validate_url(item['url'])
    if 'thumbnail' in item and item['thumbnail']:
        item['thumbnail'] = validate_url(item['thumbnail'])
    if 'lite_url' in item and item['lite_url']:
        item['lite_url'] = validate_url(item['lite_url'])

    return item

def validate_url(url):
    parsed_url = urlparse(url)
    if parsed_url.scheme and parsed_url.netloc:
        return url
    return ""

def load_data(directory_path):
    json_files = glob.glob(os.path.join(directory_path, '*.json'))

    for file_path in json_files:
        with open(file_path, 'r', encoding='utf-8') as file:
            try:
                data = json.load(file)
                if isinstance(data, list):
                    preprocessed_data = [preprocess_item(item) for item in data]
                    collection.insert_many(preprocessed_data)
                else:
                    preprocessed_data = preprocess_item(data)
                    collection.insert_one(preprocessed_data)
                print(f"Data from {file_path} inserted successfully!")
            except json.JSONDecodeError:
                file.seek(0)
                for line in file:
                    try:
                        data = json.loads(line)
                        preprocessed_data = preprocess_item(data)
                        collection.insert_one(preprocessed_data)
                    except json.JSONDecodeError as e:
                        print(f"Error decoding JSON from {file_path}: {e}")
                print(f"Data from {file_path} inserted successfully!")

if __name__ == "__main__":
    directory_path = os.path.join('..', 'Task1', 'almayadeen_scraper', 'scraped_articles')
    load_data(directory_path)
