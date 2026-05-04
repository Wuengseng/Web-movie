from fastapi import FastAPI, HTTPException, status
import uvicorn
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from src.database import connect_to_mongo, close_mongo_connection, db
from src.models.movie import Movie
from src.models.user import UserCreate, UserLogin, Token
from src.auth import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(lifespan=lifespan)

# Cấu hình CORS để Frontend (React) có thể gọi được
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https?://(localhost|127\.0\.0\.1)(:[0-9]+)?", 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/auth/register", response_model=Token)
async def register(user: UserCreate):
    if db.client is None:
        raise HTTPException(status_code=500, detail="Chưa kết nối database!")
    
    # Kiểm tra email đã tồn tại chưa
    existing_user = await db.db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email này đã được đăng ký.")
    
    # Băm mật khẩu (salt sẽ tự động sinh ra bởi bcrypt)
    hashed_password = get_password_hash(user.password)
    user_dict = {
        "email": user.email,
        "fullname": user.fullname,
        "hashed_password": hashed_password
    }
    
    await db.db["users"].insert_one(user_dict)
    
    # Tạo JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/login", response_model=Token)
async def login(user: UserLogin):
    if db.client is None:
        raise HTTPException(status_code=500, detail="Chưa kết nối database!")
        
    db_user = await db.db["users"].find_one({"email": user.email})
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tài khoản hoặc mật khẩu không chính xác",
        )
        
    if not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tài khoản hoặc mật khẩu không chính xác",
        )
        
    # Tạo JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

from google.oauth2 import id_token
from google.auth.transport import requests
from src.models.user import GoogleToken
import os

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

@app.post("/api/auth/google", response_model=Token)
async def google_login(google_token: GoogleToken):
    if db.client is None:
        raise HTTPException(status_code=500, detail="Chưa kết nối database!")
    
    try:
        # Xác minh token từ Google
        idinfo = id_token.verify_oauth2_token(
            google_token.token, 
            requests.Request(), 
            GOOGLE_CLIENT_ID
        )
        
        # Chỉ chấp nhận từ ứng dụng của bạn
        if idinfo['aud'] != GOOGLE_CLIENT_ID:
            raise ValueError("Token aud không khớp")
            
        user_email = idinfo['email']
        user_name = idinfo.get('name', 'Google User')
        avatar_url = idinfo.get('picture', None)
        google_id = idinfo['sub']
        
        # Tìm user trong db
        db_user = await db.db["users"].find_one({"email": user_email})
        
        if not db_user:
            # Tạo user mới nếu chưa có
            user_dict = {
                "email": user_email,
                "fullname": user_name,
                "auth_provider": "google",
                "google_id": google_id,
                "avatar_url": avatar_url,
                # Không có hashed_password
            }
            await db.db["users"].insert_one(user_dict)
            
        # Tạo JWT của hệ thống AnkiPlus
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_email}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}

    except ValueError as e:
        print("Google token lỗi:", e)
        raise HTTPException(status_code=401, detail="Token không hợp lệ hoặc đã hết hạn")
    except Exception as e:
        print("Google login lỗi:", e)
        raise HTTPException(status_code=500, detail="Lỗi đăng nhập Google")

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