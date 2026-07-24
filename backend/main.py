from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os

load_dotenv()

from app.database import engine, Base
from app.routers import auth, products, orders, payments, consultations, vendors, admin
from app.utils.seed import seed_admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    seed_admin()
    yield

app = FastAPI(
    title="Dercy Tech API",
    version="1.0.0",
    lifespan=lifespan
)

# Allow all localhost ports plus production URL
origins_str = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000"
)
origins = [o.strip() for o in origins_str.split(",")]

# Also add wildcard for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,          prefix="/api/auth",          tags=["Auth"])
app.include_router(products.router,      prefix="/api/products",      tags=["Products"])
app.include_router(orders.router,        prefix="/api/orders",        tags=["Orders"])
app.include_router(payments.router,      prefix="/api/payments",      tags=["Payments"])
app.include_router(consultations.router, prefix="/api/consultations", tags=["Consultations"])
app.include_router(vendors.router,       prefix="/api/vendors",       tags=["Vendors"])
app.include_router(admin.router,         prefix="/api/admin",         tags=["Admin"])

@app.get("/")
def root():
    return {"message": "Dercy Tech API is running 🚀", "version": "1.0.0"}