import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

db_url = settings.DATABASE_URL
# In Vercel serverless functions, root filesystem is read-only. Use /tmp for SQLite
if os.environ.get("VERCEL") and "sqlite" in db_url:
    db_url = "sqlite:////tmp/ip_sakti.db"

# SQLite configuration requires connect_args for check_same_thread
connect_args = {"check_same_thread": False} if "sqlite" in db_url else {}

engine = create_engine(
    db_url,
    connect_args=connect_args,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
