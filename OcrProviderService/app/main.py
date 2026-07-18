import uuid

from fastapi import FastAPI

from app.contracts import OcrJobPayload, OcrRequest
from app.infra.bullmq_queue import ocr_queue

app = FastAPI(title="OCR Provider Service")


@app.get("/health")
def get_health():
    return {"status": 200, "message": "OK"}


@app.post("/ocr")
async def post_ocr(request: OcrRequest):
    payload = OcrJobPayload(
        job_id=request.job_id or str(uuid.uuid4()),
        file_url=request.file_url,
        recipient=request.recipient,
        processing_time_seconds=request.processing_time_seconds,
    )

    job = await ocr_queue.add("process-ocr", payload.model_dump())

    return {
        "status": 200,
        "message": "OCR job queued successfully",
        "job_id": payload.job_id,
        "bullmq_job_id": job.id,
    }
