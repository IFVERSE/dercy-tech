from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import httpx
import os
from app.database import get_db
from app.models import Order
from app.schemas import PaymentVerify

router = APIRouter()

PAYSTACK_SECRET = os.getenv("PAYSTACK_SECRET_KEY", "")

@router.post("/verify")
async def verify_payment(body: PaymentVerify, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == body.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Verify with Paystack
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.paystack.co/transaction/verify/{body.reference}",
            headers={"Authorization": f"Bearer {PAYSTACK_SECRET}"},
        )

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Payment verification failed")

    data = response.json()

    if data.get("data", {}).get("status") != "success":
        raise HTTPException(status_code=400, detail="Payment was not successful")

    paid_amount = data["data"]["amount"] / 100  # Convert kobo to naira
    if abs(paid_amount - order.total) > 1:  # Allow ₦1 tolerance
        raise HTTPException(status_code=400, detail="Amount mismatch")

    order.payment_status = "paid"
    order.status = "paid"
    order.payment_reference = body.reference
    db.commit()

    return {"message": "Payment verified successfully", "order_id": order.id}