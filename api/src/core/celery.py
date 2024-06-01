from celery import Celery

from .config import settings

app = Celery(
    "worker",
    broker=settings.celery.broker_url,
    result_backend="rpc://",
)
app.conf.update(task_track_started=True)
