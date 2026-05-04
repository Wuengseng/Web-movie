# File này là entrypoint bắt buộc của Vercel Serverless Function.
# Nó sẽ kéo ứng dụng FastAPI từ thư mục src ra để Vercel có thể chạy.

from src.index import app
