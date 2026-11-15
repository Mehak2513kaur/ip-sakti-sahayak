import os
import json
from fastapi import APIRouter

router = APIRouter(prefix="/workflows", tags=["Demonstration Workflows"])

WORKFLOWS_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "sample_workflows.json")

@router.get("/list")
def list_demo_workflows():
    if os.path.exists(WORKFLOWS_FILE):
        try:
            with open(WORKFLOWS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error reading sample_workflows.json: {e}")
    return []

@router.get("/{workflow_id}")
def get_workflow(workflow_id: str):
    workflows = list_demo_workflows()
    for wf in workflows:
        if wf.get("workflow_id") == workflow_id:
            return wf
    return workflows[0] if workflows else {}
