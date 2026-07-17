from app.database import SessionLocal
from app.models import User, Product
from app.utils.auth import hash_password
import os

DEMO_PRODUCTS = [
  # PHONES
  { "name": "iPhone 15 Pro Max 256GB", "category": "phones", "brand": "Apple", "price": 890000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": True, "rating": 4.9, "warranty": "1 Year Apple Warranty", "image_url": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80", "description": "The most powerful iPhone ever. A17 Pro chip, titanium design, 48MP camera system.", "specs": {"storage": "256GB", "ram": "8GB", "display": "6.7\" Super Retina XDR", "battery": "4422mAh", "camera": "48MP Triple"} },
  { "name": "Samsung Galaxy S24 Ultra", "category": "phones", "brand": "Samsung", "price": 850000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": True, "rating": 4.8, "warranty": "1 Year Samsung Warranty", "image_url": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", "description": "Galaxy AI is here. 200MP camera, built-in S Pen, titanium frame.", "specs": {"storage": "256GB", "ram": "12GB", "display": "6.8\" Dynamic AMOLED", "battery": "5000mAh", "camera": "200MP Quad"} },
  { "name": "Tecno Spark 20 Pro", "category": "phones", "brand": "Tecno", "price": 95000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": True, "rating": 4.5, "warranty": "1 Year Tecno Warranty", "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80", "description": "Feature-packed budget phone with 108MP camera and 5000mAh battery.", "specs": {"storage": "256GB", "ram": "8GB", "display": "6.78\" AMOLED", "battery": "5000mAh", "camera": "108MP"} },
  { "name": "Infinix Note 40 Pro", "category": "phones", "brand": "Infinix", "price": 115000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.6, "warranty": "1 Year", "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80", "description": "Powerful mid-range with MagCharge wireless and 108MP AI camera.", "specs": {"storage": "256GB", "ram": "12GB", "display": "6.78\" AMOLED 120Hz", "battery": "4600mAh"} },
  { "name": "iPhone 13 128GB (Fairly Used)", "category": "phones", "brand": "Apple", "price": 320000, "condition": "fairly used", "in_stock": True, "is_new": False, "is_featured": True, "rating": 4.7, "warranty": "3 Month Dercy Warranty", "image_url": "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80", "description": "Grade A condition. All functions 100%. Comes with charger.", "specs": {"storage": "128GB", "ram": "4GB", "display": "6.1\" Super Retina XDR", "battery": "3095mAh"} },
  { "name": "Xiaomi Redmi Note 13 Pro", "category": "phones", "brand": "Xiaomi", "price": 145000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.6, "warranty": "1 Year", "image_url": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&q=80", "description": "200MP pro-grade camera system on a stunning AMOLED display.", "specs": {"storage": "256GB", "ram": "8GB", "display": "6.67\" AMOLED 120Hz", "battery": "5100mAh"} },

  # LAPTOPS
  { "name": "MacBook Air M2 13\" 256GB", "category": "laptops", "brand": "Apple", "price": 980000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": True, "rating": 4.9, "warranty": "1 Year Apple Warranty", "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", "description": "Incredibly thin, powerful M2 chip, all-day 18-hour battery.", "specs": {"processor": "Apple M2", "ram": "8GB", "storage": "256GB SSD", "display": "13.6\" Liquid Retina", "battery": "18 hrs"} },
  { "name": "HP Pavilion 15 Intel i5", "category": "laptops", "brand": "HP", "price": 385000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": True, "rating": 4.5, "warranty": "1 Year HP Warranty", "image_url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80", "description": "Perfect for school and work. Fast Intel Core i5 with backlit keyboard.", "specs": {"processor": "Intel Core i5-12th Gen", "ram": "8GB DDR4", "storage": "512GB SSD", "display": "15.6\" FHD"} },
  { "name": "Dell Inspiron 14 AMD Ryzen 5", "category": "laptops", "brand": "Dell", "price": 340000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.6, "warranty": "1 Year Dell Warranty", "image_url": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80", "description": "Slim everyday laptop with Ryzen 5 power and great display.", "specs": {"processor": "AMD Ryzen 5 5500U", "ram": "8GB", "storage": "512GB SSD", "display": "14\" FHD"} },
  { "name": "Lenovo ThinkPad E14 Gen 5", "category": "laptops", "brand": "Lenovo", "price": 420000, "condition": "brand new", "in_stock": False, "is_new": True, "is_featured": False, "rating": 4.7, "warranty": "1 Year Lenovo Warranty", "image_url": "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=500&q=80", "description": "Business-grade ThinkPad. Legendary keyboard, MIL-SPEC durable.", "specs": {"processor": "Intel Core i5-13th Gen", "ram": "16GB", "storage": "512GB SSD", "display": "14\" IPS"} },

  # TABLETS
  { "name": "iPad Air 5th Gen 64GB WiFi", "category": "tablets", "brand": "Apple", "price": 520000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": True, "rating": 4.9, "warranty": "1 Year Apple Warranty", "image_url": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", "description": "M1 chip power in a stunning 10.9\" Liquid Retina display.", "specs": {"processor": "Apple M1", "storage": "64GB", "display": "10.9\" Liquid Retina", "battery": "10 hrs", "connectivity": "WiFi 6"} },
  { "name": "Samsung Galaxy Tab S9 FE", "category": "tablets", "brand": "Samsung", "price": 245000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.6, "warranty": "1 Year Samsung Warranty", "image_url": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&q=80", "description": "Large 10.9\" display, S Pen included, IP68 water resistant.", "specs": {"processor": "Exynos 1380", "storage": "128GB", "display": "10.9\" TFT", "battery": "8000mAh"} },

  # ACCESSORIES
  { "name": "AirPods Pro 2nd Generation", "category": "accessories", "brand": "Apple", "price": 185000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": True, "rating": 4.9, "warranty": "1 Year Apple Warranty", "image_url": "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&q=80", "description": "H2 chip, Adaptive Audio, conversation awareness, USB-C case.", "specs": {"type": "In-ear TWS", "anc": "Active Noise Cancellation", "battery": "30 hrs total", "connectivity": "Bluetooth 5.3"} },
  { "name": "Samsung Galaxy Buds2 Pro", "category": "accessories", "brand": "Samsung", "price": 95000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.7, "warranty": "6 Months", "image_url": "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?w=500&q=80", "description": "Intelligent ANC, Hi-Fi 24-bit audio, IPX7 water resistant.", "specs": {"type": "In-ear TWS", "anc": "Intelligent ANC", "battery": "29 hrs total", "connectivity": "Bluetooth 5.3"} },
  { "name": "Anker 65W GaN Charger 3-Port", "category": "accessories", "brand": "Anker", "price": 18500, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.8, "warranty": "18 Month Anker", "image_url": "https://images.unsplash.com/photo-1583394293214-0b3a53c40e4a?w=500&q=80", "description": "Charge 3 devices simultaneously. 65W fast charging, compact GaN design.", "specs": {"ports": "2x USB-C + 1x USB-A", "wattage": "65W", "technology": "GaN III", "compatibility": "Universal"} },
  { "name": "Logitech MX Master 3S Mouse", "category": "accessories", "brand": "Logitech", "price": 62000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.9, "warranty": "2 Year Logitech", "image_url": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80", "description": "Ultra-quiet clicks, 8K DPI, works on glass. Perfect for creators.", "specs": {"dpi": "200-8000 DPI", "battery": "70 days", "connectivity": "Bluetooth + USB", "buttons": "7 programmable"} },

  # SMART GADGETS
  { "name": "Apple Watch Series 9 GPS 45mm", "category": "smart", "brand": "Apple", "price": 345000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": True, "rating": 4.9, "warranty": "1 Year Apple Warranty", "image_url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", "description": "S9 chip, Double Tap gesture, 2000 nits Always-On Retina display.", "specs": {"display": "45mm Always-On Retina", "chip": "S9 SiP", "battery": "18 hrs", "water_resistance": "50m WR", "sensors": "Blood O2, ECG, Temperature"} },
  { "name": "Samsung Galaxy Watch 6 Classic", "category": "smart", "brand": "Samsung", "price": 185000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.7, "warranty": "1 Year Samsung", "image_url": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80", "description": "Iconic rotating bezel, advanced sleep coaching, body composition tracking.", "specs": {"display": "47mm Super AMOLED", "battery": "425mAh", "water_resistance": "5ATM", "health": "ECG, Blood pressure"} },
  { "name": "Xiaomi Smart Band 8 Pro", "category": "smart", "brand": "Xiaomi", "price": 32000, "condition": "brand new", "in_stock": True, "is_new": True, "is_featured": False, "rating": 4.6, "warranty": "6 Months", "image_url": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&q=80", "description": "1.74\" AMOLED, GPS, 150+ sports modes, 14-day battery life.", "specs": {"display": "1.74\" AMOLED", "battery": "14 days", "gps": "Built-in GPS", "water_resistance": "5ATM"} },
]

def seed_admin():
    db = SessionLocal()
    try:
        admin_email = os.getenv("ADMIN_EMAIL", "admin@dercytech.com")
        exists = db.query(User).filter(User.email == admin_email).first()
        if not exists:
            admin = User(
                email=admin_email,
                name="Dercy Tech Admin",
                password_hash=hash_password(os.getenv("ADMIN_PASSWORD", "DercyAdmin2024!")),
                is_admin=True,
            )
            db.add(admin)
            db.commit()
            print(f"✅ Admin seeded: {admin_email}")

        # Seed demo products if none exist
        count = db.query(Product).count()
        if count == 0:
            for p in DEMO_PRODUCTS:
                product = Product(**p, images=[p["image_url"]])
                db.add(product)
            db.commit()
            print(f"✅ {len(DEMO_PRODUCTS)} demo products seeded")
    except Exception as e:
        print(f"Seed error: {e}")
        db.rollback()
    finally:
        db.close()