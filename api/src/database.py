import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ankiplus_movies")

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    if not MONGODB_URL or "<db_username>" in MONGODB_URL:
        print("CANH BAO: Ban chua dien dia chi Cum (Cluster) vao file .env!")
        return
    print("Dang ket noi toi MongoDB Atlas...")
    db.client = AsyncIOMotorClient(MONGODB_URL)
    db.db = db.client[DATABASE_NAME]
    print("Ket noi MongoDB thanh cong!")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("Da dong ket noi MongoDB.")
