from celery import Celery

from .config import settings

app = Celery(__name__)
app.conf.update(
    broker_url=settings.celery.broker_url,
    result_backend=settings.celery.result_backend,
    timezone=settings.celery.timezone,
    broker_heartbeat=240,
)
