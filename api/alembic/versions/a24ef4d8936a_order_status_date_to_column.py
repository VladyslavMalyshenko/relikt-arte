"""Order status_date_to column

Revision ID: a24ef4d8936a
Revises: e8e941fc8a42
Create Date: 2024-10-05 12:03:54.100607

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "a24ef4d8936a"
down_revision: Union[str, None] = "e8e941fc8a42"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "order", sa.Column("status_date_to", sa.Date(), nullable=True)
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("order", "status_date_to")
    # ### end Alembic commands ###
