"""AuthToken owner_new_email column

Revision ID: 6ca767716ce5
Revises: 93887609ab79
Create Date: 2024-09-22 18:30:12.693074

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "6ca767716ce5"
down_revision: Union[str, None] = "93887609ab79"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "auth_token", sa.Column("owner_new_email", sa.String(), nullable=True)
    )
    op.create_index(
        op.f("ix_auth_token_owner_new_email"),
        "auth_token",
        ["owner_new_email"],
        unique=False,
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(
        op.f("ix_auth_token_owner_new_email"), table_name="auth_token"
    )
    op.drop_column("auth_token", "owner_new_email")
    # ### end Alembic commands ###