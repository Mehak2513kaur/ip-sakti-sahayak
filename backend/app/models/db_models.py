import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="entrepreneur") # entrepreneur, researcher, practitioner, legal_expert, admin
    organization = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    sessions = relationship("ChatSession", back_populates="user")
    reports = relationship("ReportRecord", back_populates="user")

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    
    id = Column(String(100), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String(255), default="New Legal Consultation")
    language = Column(String(20), default="en")
    domain = Column(String(50), default="general") # patents, trademarks, regulations, abs, traditional_knowledge, exports
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="sessions")
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), ForeignKey("chat_sessions.id"), nullable=False)
    sender = Column(String(20), nullable=False) # user, assistant, system
    content = Column(Text, nullable=False)
    language = Column(String(20), default="en")
    citations_json = Column(Text, nullable=True) # JSON list of cited sources
    confidence_score = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    session = relationship("ChatSession", back_populates="messages")

class DocumentRecord(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    issuing_authority = Column(String(255), nullable=False) # Ministry of AYUSH, IPO, CDSCO, NBA, FSSAI, WIPO, FDA, EMA
    jurisdiction = Column(String(50), nullable=False) # India, USA, European Union, Global
    legal_category = Column(String(100), nullable=False) # Patent Law, Drug Regulation, Traditional Knowledge, Biodiversity
    publication_year = Column(Integer, nullable=True)
    official_reference = Column(String(255), nullable=True)
    source_url = Column(String(500), nullable=True)
    file_path = Column(String(500), nullable=True)
    status = Column(String(50), default="Active") # Active, Amended, Superseded
    is_verified = Column(Boolean, default=True)
    chunks_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class DocumentChunk(Base):
    __tablename__ = "document_chunks"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    section_number = Column(String(100), nullable=True)
    heading = Column(String(255), nullable=True)
    content = Column(Text, nullable=False)
    page_number = Column(Integer, nullable=True)
    keywords = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ReportRecord(Base):
    __tablename__ = "reports"
    
    id = Column(String(100), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String(255), nullable=False)
    report_type = Column(String(100), nullable=False) # Patentability, Product Classification, ABS Assessment, Global Export, IP Recommendation
    subject = Column(String(255), nullable=False)
    content_json = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="reports")

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    action = Column(String(100), nullable=False)
    user_email = Column(String(255), nullable=True)
    details = Column(Text, nullable=True)
    ip_address = Column(String(50), nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
