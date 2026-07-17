# Dercy Tech — Full Stack Platform

## Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Python FastAPI
- **Database**: PostgreSQL (SQLite for dev)
- **Payments**: Paystack

## Quick Start

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # Fill in your values
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # Fill in your values
uvicorn main:app --reload
```

## Environment Variables

### Frontend (.env)