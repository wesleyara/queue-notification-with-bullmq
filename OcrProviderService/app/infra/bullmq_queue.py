import os

from bullmq import Queue
from dotenv import load_dotenv

load_dotenv()

connection = {
    "host": os.environ["REDIS_HOST"],
    "port": int(os.environ["REDIS_PORT"]),
    "password": os.environ.get("REDIS_PASSWORD"),
}

OCR_QUEUE_NAME = "ocr"

ocr_queue = Queue(OCR_QUEUE_NAME, {"connection": connection})
