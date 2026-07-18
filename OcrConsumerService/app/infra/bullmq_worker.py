import asyncio
import os

from bullmq import Job, Queue, Worker
from dotenv import load_dotenv
from pydantic import ValidationError

from app.contracts import OcrJobPayload, OcrNotificationPayload

load_dotenv()

connection = {
    "host": os.environ["REDIS_HOST"],
    "port": int(os.environ["REDIS_PORT"]),
    "password": os.environ.get("REDIS_PASSWORD"),
}

OCR_QUEUE_NAME = "ocr"
OCR_NOTIFICATION_QUEUE_NAME = "ocr_notification"

ocr_notification_queue = Queue(OCR_NOTIFICATION_QUEUE_NAME, {"connection": connection})


async def process_ocr_job(job: Job, token: str):
    try:
        payload = OcrJobPayload(**job.data)
    except ValidationError as error:
        await ocr_notification_queue.add(
            "send-ocr-notification",
            OcrNotificationPayload(
                title="OCR falhou",
                message=f"Job {job.id} recebido fora do contrato esperado: {error}",
                recipient=job.data.get("recipient", "unknown"),
            ).model_dump(),
        )
        raise

    print(f"[ocr-consumer] processing job {payload.job_id} for {payload.recipient}")

    half_time = payload.processing_time_seconds / 2

    await ocr_notification_queue.add(
        "send-ocr-notification",
        OcrNotificationPayload(
            title="OCR iniciado",
            message=f"Iniciando processamento do arquivo {payload.file_url} (job {payload.job_id})",
            recipient=payload.recipient,
        ).model_dump(),
    )

    try:
        # Simula o processamento de OCR (POC — sem extração real de texto).
        await asyncio.sleep(half_time)

        await ocr_notification_queue.add(
            "send-ocr-notification",
            OcrNotificationPayload(
                title="OCR em andamento",
                message=f"Processamento do arquivo {payload.file_url} em andamento (job {payload.job_id})",
                recipient=payload.recipient,
            ).model_dump(),
        )

        await asyncio.sleep(half_time)
    except Exception as error:
        await ocr_notification_queue.add(
            "send-ocr-notification",
            OcrNotificationPayload(
                title="OCR falhou",
                message=f"Falha ao processar OCR do arquivo {payload.file_url} (job {payload.job_id}): {error}",
                recipient=payload.recipient,
            ).model_dump(),
        )
        raise

    await ocr_notification_queue.add(
        "send-ocr-notification",
        OcrNotificationPayload(
            title="OCR concluído",
            message=f"OCR do arquivo {payload.file_url} processado com sucesso (job {payload.job_id})",
            recipient=payload.recipient,
        ).model_dump(),
    )

    return "OCR processed successfully"


def create_ocr_worker() -> Worker:
    return Worker(OCR_QUEUE_NAME, process_ocr_job, {"connection": connection})
