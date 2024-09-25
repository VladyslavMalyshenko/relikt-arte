"""Basket and BasketItem

Revision ID: 4a2feae73d75
Revises: cbe214c24453
Create Date: 2024-08-20 10:19:16.119099

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "4a2feae73d75"
down_revision: Union[str, None] = "cbe214c24453"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "basket",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.UUID(), nullable=True),
        sa.Column("session_id", sa.String(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["user.id"], onupdate="CASCADE", ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_basket_session_id"), "basket", ["session_id"], unique=False
    )
    op.create_index(
        op.f("ix_basket_user_id"), "basket", ["user_id"], unique=False
    )
    op.create_table(
        "basket_item",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("basket_id", sa.Integer(), nullable=False),
        sa.Column("product_id", sa.Integer(), nullable=False),
        sa.Column("color_id", sa.Integer(), nullable=True),
        sa.Column("size_id", sa.Integer(), nullable=True),
        sa.Column("covering_id", sa.Integer(), nullable=True),
        sa.Column("glass_color_id", sa.Integer(), nullable=True),
        sa.Column(
            "material",
            postgresql.ENUM("WOOD", "MDF", name="item_material_enum"),
            nullable=True,
        ),
        sa.Column(
            "type_of_platband",
            postgresql.ENUM(
                "DEFAULT",
                "L_SHAPED",
                name="product_type_of_platband_enum",
                create_type=False,
            ),
            nullable=True,
        ),
        sa.Column(
            "orientation",
            postgresql.ENUM(
                "LEFT",
                "RIGHT",
                name="product_orientation_enum",
                create_type=False,
            ),
            nullable=True,
        ),
        sa.Column("with_glass", sa.Boolean(), nullable=True),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["basket_id"],
            ["basket.id"],
            onupdate="CASCADE",
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["color_id"],
            ["product_color.id"],
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["covering_id"],
            ["product_covering.id"],
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["glass_color_id"],
            ["product_glass_color.id"],
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["product_id"],
            ["product.id"],
            onupdate="CASCADE",
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["size_id"],
            ["product_size.id"],
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_basket_item_basket_id"),
        "basket_item",
        ["basket_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_basket_item_color_id"),
        "basket_item",
        ["color_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_basket_item_covering_id"),
        "basket_item",
        ["covering_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_basket_item_glass_color_id"),
        "basket_item",
        ["glass_color_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_basket_item_product_id"),
        "basket_item",
        ["product_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_basket_item_size_id"),
        "basket_item",
        ["size_id"],
        unique=False,
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_basket_item_size_id"), table_name="basket_item")
    op.drop_index(op.f("ix_basket_item_product_id"), table_name="basket_item")
    op.drop_index(
        op.f("ix_basket_item_glass_color_id"), table_name="basket_item"
    )
    op.drop_index(op.f("ix_basket_item_covering_id"), table_name="basket_item")
    op.drop_index(op.f("ix_basket_item_color_id"), table_name="basket_item")
    op.drop_index(op.f("ix_basket_item_basket_id"), table_name="basket_item")
    op.drop_table("basket_item")
    op.drop_index(op.f("ix_basket_user_id"), table_name="basket")
    op.drop_index(op.f("ix_basket_session_id"), table_name="basket")
    op.drop_table("basket")
    # ### end Alembic commands ###