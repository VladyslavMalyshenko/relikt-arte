import asyncio
import logging

from ..core.celery import app as celery_app
from ..core.db.unitofwork import UnitOfWork

from .service import OrderService


log = logging.getLogger(__name__)


@celery_app.task(name="update_order_status_by_status_date_to")
def update_order_status_by_status_date_to():
    try:
        asyncio.run(
            OrderService(UnitOfWork()).update_orders_by_status_date_to(),
        )
    except Exception as e:
        log.exception(e)
