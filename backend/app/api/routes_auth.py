import uuid
import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.db_models import User
from app.models.schemas import UserLogin, UserRegister, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists.")
    
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=f"hash_{user_data.password}", # simple mock hash for demo
        role=user_data.role,
        organization=user_data.organization
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user:
        # Create a default demo user if logging in with demo credentials
        if "ayush" in login_data.email.lower() or "demo" in login_data.email.lower():
            user = User(
                name="Vaidya Dr. Rajesh Sharma",
                email=login_data.email,
                hashed_password=f"hash_{login_data.password}",
                role="entrepreneur",
                organization="AyurTech Innovations Pvt Ltd"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password.")
            
    return {
        "access_token": f"ayush_jwt_{uuid.uuid4().hex}",
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "organization": user.organization
        }
    }

@router.get("/demo-user")
def get_demo_user():
    return {
        "id": 1,
        "name": "Dr. Ananya Sengupta",
        "email": "ananya.s@ayurtech.org.in",
        "role": "entrepreneur",
        "organization": "National Ayurvedic Startup Consortium",
        "active_jurisdictions": ["India", "USA", "European Union"]
    }
