from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Consultation
from app.schemas import ConsultationCreate
from app.utils.auth import require_admin

router = APIRouter()

@router.post("", status_code=201)
def create_consultation(body: ConsultationCreate, db: Session = Depends(get_db)):
    c = Consultation(**body.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return {"message": "Consultation request received", "id": c.id}

@router.get("", dependencies=[Depends(require_admin)])
def list_consultations(db: Session = Depends(get_db)):
    return db.query(Consultation).order_by(Consultation.created_at.desc()).all()