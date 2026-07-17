from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import Product, Order, User
from app.utils.auth import require_admin

router = APIRouter()

@router.get("/stats", dependencies=[Depends(require_admin)])
def get_stats(db: Session = Depends(get_db)):
    total_products = db.query(Product).count()
    total_orders = db.query(Order).count()
    revenue_result = db.query(func.sum(Order.total)).filter(Order.payment_status == "paid").scalar()
    total_revenue = float(revenue_result or 0)
    unique_customers = db.query(func.count(func.distinct(Order.customer_email))).scalar()
    return {
        "products": total_products,
        "orders": total_orders,
        "revenue": total_revenue,
        "customers": unique_customers,
    }