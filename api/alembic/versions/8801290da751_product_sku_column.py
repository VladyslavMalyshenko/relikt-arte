"""Product sku column

Revision ID: 8801290da751
Revises: ca0af79f0942
Create Date: 2024-07-18 10:31:59.090094

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "8801290da751"
down_revision: Union[str, None] = "ca0af79f0942"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("product", sa.Column("sku", sa.String(), nullable=True))
    op.create_index(op.f("ix_product_sku"), "product", ["sku"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_product_sku"), table_name="product")
    op.drop_column("product", "sku")
    # ### end Alembic commands ###
