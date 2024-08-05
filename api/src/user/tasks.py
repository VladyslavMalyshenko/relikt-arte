import asyncio

from fastapi_mail import FastMail, MessageSchema

from ..core.celery import app as celery_app
from ..core.config import settings


@celery_app.task(name="send_registration_email")
def send_registration_email():

    body = """
    <p>This is the registration confirmation email. Please click the link below to confirm your registration:</p>
    <br/>
    <br/>
    <a href="http://localhost:8000/api/v1/auth/confirm-registration?token=1234567890">Confirm registration</a>
    """

    message = MessageSchema(
        subject="Hello",
        recipients=["okuzmenko31us@gmail.com"],
        body=body,
        subtype="html",
    )
    fm = FastMail(settings.smtp.connection_config)
    asyncio.run(fm.send_message(message))
