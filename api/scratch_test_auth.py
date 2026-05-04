from src.auth import get_password_hash, verify_password

try:
    hash_str = get_password_hash("123456")
    print("Hash:", hash_str)
    ok = verify_password("123456", hash_str)
    print("Verify:", ok)
    
    # Check the users.json hash
    ok2 = verify_password("123456", "$2b$12$Kj6lQ0RkY0A4oE4h7xP5X.vS2Gv5JkX/oG3WwOaO1Pz8Z.9D0/P1S")
    print("Verify users.json:", ok2)
except Exception as e:
    print("Error:", repr(e))
