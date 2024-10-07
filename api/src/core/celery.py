from celery import Celery

from .config import settings

app = Celery(__name__)
app.conf.update(
    broker_url=settings.celery.broker_url,
    result_backend=settings.celery.result_backend,
    timezone=settings.celery.timezone,
    broker_heartbeat=240,
)
app.autodiscover_tasks(["src.user.tasks"])
app.autodiscover_tasks(["src.letter.tasks"])
app.autodiscover_tasks(["src.order.tasks"])


app.conf.timezone = "Europe/Kyiv"
app.conf.beat_schedule = {
    "update_order_status_by_status_date_to": {
        "task": "update_order_status_by_status_date_to",
        "schedule": 86400.0,  # 24 hours (run once a day at midnight)
        "options": {"expires": 3600},  # expire task if not executed in 1 hour
    },
}
