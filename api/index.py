import sys
import os

# Đảm bảo Vercel nhận diện được thư mục 'src'
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from src.index import app
