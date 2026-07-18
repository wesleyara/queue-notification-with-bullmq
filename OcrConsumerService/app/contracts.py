from pydantic import BaseModel, Field


class OcrJobPayload(BaseModel):
    """Contract this consumer requires on the "ocr" queue. Producers (e.g.
    OcrProviderService) must publish jobs matching this shape."""

    job_id: str
    file_url: str
    recipient: str
    processing_time_seconds: float = Field(gt=0, default=3.0)


class OcrNotificationPayload(BaseModel):
    """Contract already defined by NotificationService on "ocr_notification"."""

    title: str
    message: str
    recipient: str
