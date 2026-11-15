import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.config import settings
from app.database import init_db
from app.api import (
    routes_auth,
    routes_chat,
    routes_classifier,
    routes_ip,
    routes_tk,
    routes_compliance,
    routes_abs,
    routes_documents,
    routes_reports,
    routes_admin,
    routes_workflows
)

# Initialize database schema
try:
    init_db()
except Exception as e:
    print(f"Database initialization notice: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-Powered Multilingual Intellectual Property & Regulatory Assistant for Ayurveda - Ministry of AYUSH, Government of India",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api/v1, /api, and root prefix
for prefix in [settings.API_V1_STR, "/api", ""]:
    app.include_router(routes_auth.router, prefix=prefix)
    app.include_router(routes_chat.router, prefix=prefix)
    app.include_router(routes_classifier.router, prefix=prefix)
    app.include_router(routes_ip.router, prefix=prefix)
    app.include_router(routes_tk.router, prefix=prefix)
    app.include_router(routes_compliance.router, prefix=prefix)
    app.include_router(routes_abs.router, prefix=prefix)
    app.include_router(routes_documents.router, prefix=prefix)
    app.include_router(routes_reports.router, prefix=prefix)
    app.include_router(routes_admin.router, prefix=prefix)
    app.include_router(routes_workflows.router, prefix=prefix)

@app.get("/api/status")
@app.get("/status")
def api_status():
    return {
        "platform": settings.PROJECT_NAME,
        "organization": "Ministry of AYUSH, Government of India",
        "status": "Online",
        "version": settings.VERSION,
        "docs": "/docs",
        "jurisdictions_supported": ["India", "USA", "European Union", "United Kingdom", "Australia", "Canada"],
        "languages_supported": 10
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "rag_engine": "active",
        "demo_mode": settings.DEMO_MODE
    }

# Mount frontend dist static files if built
frontend_dist = os.path.abspath(
    os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "frontend", "dist")
)

if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        # Don't intercept API or docs
        if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("redoc"):
            return None
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))
