import pymongo
import json
import glob
import os

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["almayadeen"]
collection = db["articles"]

# Load and insert JSON data
def load_data(directory_path):
    # Find all JSON files in the directory
    json_files = glob.glob(os.path.join(directory_path, '*.json'))

    for file_path in json_files:
        with open(file_path, 'r', encoding='utf-8') as file:
            try:
                # Attempt to load the entire file as a JSON array
                data = json.load(file)
                collection.insert_many(data)
                print(f"Data from {file_path} inserted successfully!")
            except json.JSONDecodeError:
                # If loading as a JSON array fails, read the file line by line
                file.seek(0)  # Reset file pointer to the beginning
                for line in file:
                    try:
                        data = json.loads(line)
                        collection.insert_one(data)
                    except json.JSONDecodeError as e:
                        print(f"Error decoding JSON from {file_path}: {e}")
                print(f"Data from {file_path} inserted successfully!")

if __name__ == "__main__":
    # Path to the directory containing JSON files
    directory_path = os.path.join('..', 'Task1', 'almayadeen_scraper', 'scraped_articles')
    load_data(directory_path)
