from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import LoginRequest
from app.utils.auth import create_token, get_current_user
import bcrypt

router = APIRouter()

@router.post("/login")
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    try:
        password_match = bcrypt.checkpw(
            body.password.encode("utf-8"),
            user.password_hash.encode("utf-8")
        )
    except Exception as e:
        print(f"Password check error: {e}")
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not password_match:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token({"sub": user.id})

    return {
        "access_token": token,
        "user": {
            "id":       user.id,
            "name":     user.name,
            "email":    user.email,
            "is_admin": user.is_admin,
        }
    }

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id":       current_user.id,
        "name":     current_user.name,
        "email":    current_user.email,
        "is_admin": current_user.is_admin,
    }