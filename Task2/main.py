from fastapi import FastAPI
from repositories.routers import articles, authors, keywords, classes, languages, videos, dates, word_count, thumbnails, updates

app = FastAPI()

app.include_router(keywords.router)
app.include_router(authors.router)
app.include_router(articles.router)
app.include_router(classes.router)
app.include_router(languages.router)
app.include_router(videos.router)
app.include_router(dates.router)
app.include_router(word_count.router)
app.include_router(thumbnails.router)
app.include_router(updates.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
