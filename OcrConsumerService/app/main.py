from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.infra.bullmq_worker import create_ocr_worker

worker = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global worker
    worker = create_ocr_worker()
    print("[ocr-consumer] worker listening on queue 'ocr'")

    yield

    if worker:
        await worker.close()


app = FastAPI(title="OCR Consumer Service", lifespan=lifespan)


@app.get("/health")
def get_health():
    return {"status": 200, "message": "OK"}
