"""Basket removed column session_id and it was changed to basket_token

Revision ID: 324dbe1f7974
Revises: 4a2feae73d75
Create Date: 2024-08-20 21:44:58.263485

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "324dbe1f7974"
down_revision: Union[str, None] = "4a2feae73d75"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "basket", sa.Column("basket_token", sa.String(), nullable=True)
    )
    op.drop_index("ix_basket_session_id", table_name="basket")
    op.create_index(
        op.f("ix_basket_basket_token"),
        "basket",
        ["basket_token"],
        unique=False,
    )
    op.drop_column("basket", "session_id")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "basket",
        sa.Column(
            "session_id", sa.VARCHAR(), autoincrement=False, nullable=True
        ),
    )
    op.drop_index(op.f("ix_basket_basket_token"), table_name="basket")
    op.create_index(
        "ix_basket_session_id", "basket", ["session_id"], unique=False
    )
    op.drop_column("basket", "basket_token")
    # ### end Alembic commands ###
