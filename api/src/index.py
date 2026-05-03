from fastapi import FastAPI, HTTPException
import uvicorn
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from src.database import connect_to_mongo, close_mongo_connection, db
from src.models.movie import Movie

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(lifespan=lifespan)

# Cấu hình CORS để Frontend (React) có thể gọi được
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Trong thực tế nên sửa lại thành URL của Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def get_server_status():
    return {"status": "ok", "message": "Server is running"}

@app.post("/api/movies")
async def create_movie(movie: Movie):
    if db.client is None:
        raise HTTPException(status_code=500, detail="Chưa kết nối database!")
    
    movie_dict = movie.model_dump()
    # Generate auto-increment ID if not provided (simplified)
    if movie_dict.get("id") is None:
        count = await db.db["movies"].count_documents({})
        movie_dict["id"] = count + 1
        
    result = await db.db["movies"].insert_one(movie_dict)
    return {"message": "Tạo phim thành công", "inserted_id": str(result.inserted_id)}

@app.get("/api/movies")
async def get_movies():
    if db.client is None:
        raise HTTPException(status_code=500, detail="Chưa kết nối database!")
    
    movies = await db.db["movies"].find({}, {"_id": 0}).to_list(100)
    return movies

if __name__ == "__main__":
    uvicorn.run("src.index:app", host="0.0.0.0", port=5000, reload=True)