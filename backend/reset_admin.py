import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine, Base
from app.models import User
import bcrypt
import uuid

# Create tables if not exist
Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    # Delete existing admin
    existing = db.query(User).filter(User.email == "admin@dercytech.com").first()
    if existing:
        db.delete(existing)
        db.commit()
        print("Deleted old admin user")

    # Create fresh admin with correct password hash
    password = "Admin1234!"
    password_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt).decode("utf-8")

    admin = User(
        id=str(uuid.uuid4()),
        email="admin@dercytech.com",
        name="Dercy Tech Admin",
        password_hash=hashed,
        is_admin=True,
        phone="08114719834",
    )
    db.add(admin)
    db.commit()

    print("=" * 40)
    print("Admin created successfully!")
    print("Email:    admin@dercytech.com")
    print("Password: Admin1234!")
    print("=" * 40)

    # Verify it works
    user = db.query(User).filter(User.email == "admin@dercytech.com").first()
    check = bcrypt.checkpw(password_bytes, user.password_hash.encode("utf-8"))
    print(f"Password verification test: {'PASSED' if check else 'FAILED'}")

except Exception as e:
    print(f"Error: {e}")
    db.rollback()
finally:
    db.close()