from pymongo import MongoClient

class Database:
    def __init__(self, uri="mongodb://localhost:27017/", db_name="almayadeen"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def get_collection(self, collection_name):
        return self.db[collection_name]

    def close(self):
        self.client.close()


if __name__ == "__main__":
    database = Database()
    collection = database.get_collection("articles")
    print(collection.find_one())
    database.close()
