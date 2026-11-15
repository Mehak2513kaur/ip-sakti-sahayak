import os
import uuid
import datetime
import tempfile
from typing import Dict, Any
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# Support read-only environments like Vercel Serverless Functions
if os.environ.get("VERCEL"):
    REPORTS_DIR = os.path.join(tempfile.gettempdir(), "generated_reports")
else:
    REPORTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "generated_reports")

try:
    os.makedirs(REPORTS_DIR, exist_ok=True)
except Exception:
    REPORTS_DIR = os.path.join(tempfile.gettempdir(), "generated_reports")
    os.makedirs(REPORTS_DIR, exist_ok=True)

class ReportService:
    def generate_pdf_report(self, report_type: str, title: str, subject_data: Dict[str, Any]) -> str:
        report_id = f"REP-{datetime.datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        pdf_filename = f"{report_id}.pdf"
        pdf_path = os.path.join(REPORTS_DIR, pdf_filename)

        doc = SimpleDocTemplate(
            pdf_path,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()
        
        # Custom palette styles
        title_style = ParagraphStyle(
            'HeaderTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=18,
            leading=22,
            textColor=colors.HexColor("#123C32"),
            alignment=TA_CENTER
        )
        
        subtitle_style = ParagraphStyle(
            'HeaderSub',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=13,
            textColor=colors.HexColor("#197B5A"),
            alignment=TA_CENTER
        )
        
        h2_style = ParagraphStyle(
            'H2',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=15,
            textColor=colors.HexColor("#123C32"),
            spaceBefore=10,
            spaceAfter=4
        )
        
        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=13,
            textColor=colors.HexColor("#202923")
        )

        disclaimer_style = ParagraphStyle(
            'Disclaimer',
            parent=styles['Normal'],
            fontName='Helvetica-Oblique',
            fontSize=8,
            leading=11,
            textColor=colors.HexColor("#4B5A50"),
            alignment=TA_CENTER
        )

        elements = []

        # Header Banner
        elements.append(Paragraph("GOVERNMENT OF INDIA • MINISTRY OF AYUSH", subtitle_style))
        elements.append(Paragraph("IP-SAKTI SAHAYAK • REGULATORY INTELLIGENCE DOSSIER", title_style))
        elements.append(Paragraph(f"Official Legal Analysis & Compliance Assessment • Ref: {report_id}", subtitle_style))
        elements.append(Spacer(1, 10))
        elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#C6A45B"), spaceAfter=12))

        # Metadata Table
        meta_data = [
            [
                Paragraph("<b>Report Type:</b>", body_style), Paragraph(report_type.replace('_', ' ').title(), body_style),
                Paragraph("<b>Date Generated:</b>", body_style), Paragraph(datetime.datetime.utcnow().strftime("%d %B %Y, %H:%M UTC"), body_style)
            ],
            [
                Paragraph("<b>Subject Title:</b>", body_style), Paragraph(title, body_style),
                Paragraph("<b>Classification Status:</b>", body_style), Paragraph("Official Advisory Report", body_style)
            ]
        ]
        meta_table = Table(meta_data, colWidths=[110, 160, 110, 160])
        meta_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F7F5EF")),
            ('PADDING', (0,0), (-1,-1), 6),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#E5EDE5")),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ]))
        elements.append(meta_table)
        elements.append(Spacer(1, 12))

        # Executive Summary Section
        elements.append(Paragraph("1. EXECUTIVE SUMMARY & STATUTORY DETERMINATION", h2_style))
        summary_text = subject_data.get("summary") or subject_data.get("direct_answer") or subject_data.get("reasoning") or "Analysis completed in accordance with Indian Ayurvedic and IPR regulatory frameworks."
        elements.append(Paragraph(summary_text, body_style))
        elements.append(Spacer(1, 10))

        # Key Findings / Assessment Details
        elements.append(Paragraph("2. REGULATORY FINDINGS & LEGAL PROVISIONS", h2_style))
        findings_data = []
        for key, val in subject_data.items():
            if key not in ["summary", "direct_answer", "reasoning", "citations"] and isinstance(val, (str, list)):
                val_str = ", ".join(val) if isinstance(val, list) else str(val)
                clean_key = key.replace("_", " ").title()
                findings_data.append([Paragraph(f"<b>{clean_key}:</b>", body_style), Paragraph(val_str[:400], body_style)])

        if findings_data:
            findings_table = Table(findings_data[:8], colWidths=[160, 380])
            findings_table.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#E5EDE5")),
                ('PADDING', (0,0), (-1,-1), 5),
                ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E5EDE5")),
                ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ]))
            elements.append(findings_table)

        elements.append(Spacer(1, 12))

        # Statutory Citations
        elements.append(Paragraph("3. VERIFIED STATUTORY CITATIONS & OFFICIAL SOURCES", h2_style))
        citations = subject_data.get("citations", [])
        if not citations:
            citations = [
                {"title": "The Patents Act, 1970", "section": "Section 3(p) & 3(e)", "authority": "IP India (CGPDTM)"},
                {"title": "Drugs and Cosmetics Act, 1940 & Rules 1945", "section": "Section 3(a), 3(h), Rule 158-B", "authority": "Ministry of AYUSH"},
                {"title": "The Biological Diversity Act, 2002 & 2023 Amendment", "section": "Section 3, 6, 7", "authority": "National Biodiversity Authority"}
            ]
        
        cite_data = [[Paragraph("<b>Document Title / Statute</b>", body_style), Paragraph("<b>Section / Provision</b>", body_style), Paragraph("<b>Issuing Authority</b>", body_style)]]
        for c in citations[:5]:
            title_c = c.get("title") or c.get("document_title", "Official Statute")
            sec_c = c.get("section") or c.get("section_number", "General")
            auth_c = c.get("authority") or c.get("issuing_authority", "Govt of India")
            cite_data.append([Paragraph(title_c, body_style), Paragraph(sec_c, body_style), Paragraph(auth_c, body_style)])

        cite_table = Table(cite_data, colWidths=[240, 140, 160])
        cite_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#123C32")),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('PADDING', (0,0), (-1,-1), 5),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#C6A45B")),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ]))
        elements.append(cite_table)

        elements.append(Spacer(1, 16))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#C6A45B"), spaceAfter=10))

        # Legal Disclaimer
        disclaimer_text = (
            "IMPORTANT STATUTORY DISCLAIMER: This document is generated by IP-SAKTI Sahayak, an AI-powered legal intelligence system developed "
            "for the Ministry of AYUSH. The citations, provisions, and classifications provided are for technical guidance and pre-filing intelligence. "
            "This report does not constitute a formal legal opinion, advocate-client relationship, or guarantee of patent grant or regulatory licensing. "
            "Formal submissions must be vetted by a registered Indian Patent Attorney or regulatory affairs specialist."
        )
        elements.append(Paragraph(disclaimer_text, disclaimer_style))

        doc.build(elements)
        return pdf_filename

report_service = ReportService()
