"""Product added material_choice and type_of_platband_choice

Revision ID: 93887609ab79
Revises: 8bd9ee3694a9
Create Date: 2024-09-03 14:49:15.410126

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "93887609ab79"
down_revision: Union[str, None] = "8bd9ee3694a9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "product", sa.Column("material_choice", sa.Boolean(), nullable=False)
    )
    op.add_column(
        "product",
        sa.Column("type_of_platband_choice", sa.Boolean(), nullable=False),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("product", "type_of_platband_choice")
    op.drop_column("product", "material_choice")
    # ### end Alembic commands ###