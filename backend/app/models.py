from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, JSON, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

def gen_id():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=gen_id)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    name = Column(String)
    phone = Column(String, nullable=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "products"
    id = Column(String, primary_key=True, default=gen_id)
    name = Column(String, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float)
    category = Column(String, index=True)
    brand = Column(String, nullable=True)
    condition = Column(String, default="brand new")
    image_url = Column(String, nullable=True)
    images = Column(JSON, default=list)
    specs = Column(JSON, default=dict)
    warranty = Column(String, nullable=True)
    in_stock = Column(Boolean, default=True)
    is_new = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    rating = Column(Float, default=4.8)
    reviews_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Order(Base):
    __tablename__ = "orders"
    id = Column(String, primary_key=True, default=gen_id)
    customer_name = Column(String)
    customer_email = Column(String)
    customer_phone = Column(String)
    customer_address = Column(String)
    customer_state = Column(String, nullable=True)
    customer_city = Column(String, nullable=True)
    items = Column(JSON)
    items_count = Column(Integer, default=0)
    total = Column(Float)
    status = Column(String, default="pending")
    payment_status = Column(String, default="unpaid")
    payment_reference = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Consultation(Base):
    __tablename__ = "consultations"
    id = Column(String, primary_key=True, default=gen_id)
    name = Column(String)
    phone = Column(String)
    email = Column(String, nullable=True)
    purpose = Column(String)
    budget = Column(String)
    details = Column(Text, nullable=True)
    status = Column(String, default="new")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class VendorApplication(Base):
    __tablename__ = "vendor_applications"
    id = Column(String, primary_key=True, default=gen_id)
    business_name = Column(String)
    contact_name = Column(String, nullable=True)
    email = Column(String)
    phone = Column(String)
    category = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())