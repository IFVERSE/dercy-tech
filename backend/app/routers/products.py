from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from app.database import get_db
from app.models import Product
from app.schemas import ProductCreate, ProductUpdate, ProductOut
from app.utils.auth import require_admin

router = APIRouter()

@router.get("")
def list_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    brand: Optional[str] = None,
    condition: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    featured: Optional[bool] = None,
    sort: str = "newest",
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    q = db.query(Product)
    if search:
        q = q.filter(or_(Product.name.ilike(f"%{search}%"), Product.brand.ilike(f"%{search}%")))
    if category:
        q = q.filter(Product.category == category)
    if brand:
        q = q.filter(Product.brand.ilike(f"%{brand}%"))
    if condition:
        q = q.filter(Product.condition == condition)
    if min_price is not None:
        q = q.filter(Product.price >= min_price)
    if max_price is not None:
        q = q.filter(Product.price <= max_price)
    if featured:
        q = q.filter(Product.is_featured == True)

    total = q.count()
    if sort == "price_asc":
        q = q.order_by(Product.price.asc())
    elif sort == "price_desc":
        q = q.order_by(Product.price.desc())
    else:
        q = q.order_by(Product.created_at.desc())

    products = q.offset((page - 1) * limit).limit(limit).all()
    return {"products": products, "total": total, "page": page, "pages": (total + limit - 1) // limit}

@router.get("/{product_id}")
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("", dependencies=[Depends(require_admin)], status_code=201)
def create_product(body: ProductCreate, db: Session = Depends(get_db)):
    product = Product(**body.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.put("/{product_id}", dependencies=[Depends(require_admin)])
def update_product(product_id: str, body: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(product, k, v)
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", dependencies=[Depends(require_admin)])
def delete_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}