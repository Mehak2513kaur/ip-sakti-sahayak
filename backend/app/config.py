import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "IP-SAKTI Sahayak"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment & Host
    APP_ENV: str = os.getenv("APP_ENV", "development")
    PORT: int = int(os.getenv("PORT", 8000))
    HOST: str = os.getenv("HOST", "127.0.0.1")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1")
    
    # AI / LLM Configuration
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    DEMO_MODE: str = os.getenv("DEMO_MODE", "auto")
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./ip_sakti.db")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "ayush_ip_sakti_dev_secret_2026")
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

settings = Settings()
