import asyncio
import argparse
import sys
import logging

from pydantic import ValidationError

from sqlalchemy.exc import SQLAlchemyError

from ..core.db.unitofwork import UnitOfWork

from ..utils.exceptions.user import UserByEmailAlreadyExistsException

from ..user.service import UserService
from ..user.schemas import AdminUserCreate


log = logging.getLogger(__name__)


async def main(argv=sys.argv):
    global log

    description = "Script to create an admin user"

    parser = argparse.ArgumentParser(description=description)
    parser.add_argument(
        "--email",
        "-e",
        required=True,
        help="Password of the admin user",
    )
    parser.add_argument(
        "--phone",
        "-p",
        required=True,
        help="Phone of the admin user",
    )
    parser.add_argument(
        "--password",
        "-psw",
        required=True,
        help="Password of the admin user",
    )

    args = parser.parse_args(argv[1:])

    print(args.phone)

    try:
        data = AdminUserCreate(
            email=args.email,
            phone=args.phone,
            password=args.password,
        )
    except ValidationError as e:
        parser.error(e.errors())

    try:
        user_show = await UserService(UnitOfWork()).create_user(data)
        print(f"\n\nAdmin user created: {user_show.model_dump()}\n\n")
    except UserByEmailAlreadyExistsException as e:
        parser.error(e)
    except SQLAlchemyError as e:
        log.exception(e)
        parser.error("Error creating user")


if __name__ == "__main__":
    asyncio.run(main())
