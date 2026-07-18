from typing import Optional

from pydantic import BaseModel, Field


class OcrJobPayload(BaseModel):
    """Contract expected by OcrConsumerService on the "ocr" queue."""

    job_id: str
    file_url: str
    recipient: str
    processing_time_seconds: float = Field(gt=0, default=3.0)


class OcrRequest(BaseModel):
    """Request body accepted by POST /ocr. job_id is optional and generated
    server-side when the client doesn't supply one. processing_time_seconds
    controls how long OcrConsumerService takes to simulate the OCR work."""

    job_id: Optional[str] = None
    file_url: str
    recipient: str
    processing_time_seconds: float = Field(gt=0, default=3.0)
