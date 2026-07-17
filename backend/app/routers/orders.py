from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import Order
from app.schemas import OrderCreate, OrderStatusUpdate
from app.utils.auth import require_admin
import uuid

router = APIRouter()

@router.post("", status_code=201)
def create_order(body: OrderCreate, db: Session = Depends(get_db)):
    ref = f"DERCY-{uuid.uuid4().hex[:12].upper()}"
    order = Order(
        customer_name=body.customer.get("name"),
        customer_email=body.customer.get("email"),
        customer_phone=body.customer.get("phone"),
        customer_address=body.customer.get("address"),
        customer_state=body.customer.get("state"),
        customer_city=body.customer.get("city"),
        items=body.items,
        items_count=sum(i.get("qty", 1) for i in body.items),
        total=body.total,
        payment_reference=ref,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return {"order_id": order.id, "reference": ref}

@router.get("")
def list_orders(
    status: Optional[str] = None,
    limit: int = 50,
    page: int = 1,
    db: Session = Depends(get_db)
):
    q = db.query(Order)
    if status:
        q = q.filter(Order.status == status)
    total = q.count()
    orders = q.order_by(Order.created_at.desc()).offset((page - 1) * limit).limit(limit).all()
    return {"orders": orders, "total": total}

@router.patch("/{order_id}/status")
def update_order_status(order_id: str, body: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = body.status
    db.commit()
    return {"message": "Status updated"}

@router.get("/{order_id}")
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order