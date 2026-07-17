from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import VendorApplication
from app.schemas import VendorApplicationCreate
from app.utils.auth import require_admin

router = APIRouter()

@router.post("/apply", status_code=201)
def apply(body: VendorApplicationCreate, db: Session = Depends(get_db)):
    app = VendorApplication(**body.model_dump())
    db.add(app)
    db.commit()
    return {"message": "Application received"}

@router.get("", dependencies=[Depends(require_admin)])
def list_applications(db: Session = Depends(get_db)):
    return db.query(VendorApplication).order_by(VendorApplication.created_at.desc()).all()