from fastapi import FastAPI
from routers import articles_router

app = FastAPI()

app.include_router(articles_router.router, prefix="/articles", tags=["articles"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
