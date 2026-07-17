from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# Auth
class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    user: Dict[str, Any]

# Products
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category: str
    brand: Optional[str] = None
    condition: str = "brand new"
    image_url: Optional[str] = None
    images: Optional[List[str]] = []
    specs: Optional[Dict[str, Any]] = {}
    warranty: Optional[str] = None
    in_stock: bool = True
    is_new: bool = True
    is_featured: bool = False

class ProductUpdate(ProductCreate):
    name: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None

class ProductOut(BaseModel):
    id: str
    name: str
    description: Optional[str]
    price: float
    category: str
    brand: Optional[str]
    condition: str
    image_url: Optional[str]
    images: List[str]
    specs: Dict[str, Any]
    warranty: Optional[str]
    in_stock: bool
    is_new: bool
    is_featured: bool
    rating: float
    reviews_count: int
    created_at: datetime

    class Config:
        from_attributes = True

# Orders
class OrderCreate(BaseModel):
    customer: Dict[str, str]
    items: List[Dict[str, Any]]
    total: float

class OrderStatusUpdate(BaseModel):
    status: str

# Consultations
class ConsultationCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    purpose: str
    budget: str
    details: Optional[str] = None

# Vendors
class VendorApplicationCreate(BaseModel):
    business_name: str
    contact_name: Optional[str] = None
    email: str
    phone: str
    category: Optional[str] = None
    description: Optional[str] = None

# Payments
class PaymentVerify(BaseModel):
    reference: str
    order_id: str