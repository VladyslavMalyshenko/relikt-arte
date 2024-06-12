"""Product models

Revision ID: 8c2955d2ba3a
Revises: 14ecf012e638
Create Date: 2024-06-09 15:54:28.254544

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "8c2955d2ba3a"
down_revision: Union[str, None] = "14ecf012e638"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "product_category",
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
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
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "product_color",
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
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
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "product_covering",
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
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
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "product_glass_color",
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
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
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "product_size",
        sa.Column("height", sa.Integer(), nullable=False),
        sa.Column("width", sa.Integer(), nullable=False),
        sa.Column("thickness", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
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
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_product_size_height"),
        "product_size",
        ["height"],
        unique=False,
    )
    op.create_index(
        op.f("ix_product_size_thickness"),
        "product_size",
        ["thickness"],
        unique=False,
    )
    op.create_index(
        op.f("ix_product_size_width"), "product_size", ["width"], unique=False
    )
    op.create_table(
        "product",
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column(
            "orientation",
            postgresql.ENUM("LEFT", "RIGHT", name="product_orientation"),
            nullable=True,
        ),
        sa.Column("have_glass", sa.Boolean(), nullable=False),
        sa.Column(
            "description",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
        ),
        sa.Column("category_id", sa.Integer(), nullable=False),
        sa.Column("color_id", sa.Integer(), nullable=False),
        sa.Column("covering_id", sa.Integer(), nullable=True),
        sa.Column("glass_color_id", sa.Integer(), nullable=True),
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
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
            ["category_id"],
            ["product_category.id"],
            onupdate="CASCADE",
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["color_id"],
            ["product_color.id"],
            onupdate="CASCADE",
            ondelete="CASCADE",
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
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_product_category_id"),
        "product",
        ["category_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_product_color_id"), "product", ["color_id"], unique=False
    )
    op.create_index(
        op.f("ix_product_covering_id"),
        "product",
        ["covering_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_product_glass_color_id"),
        "product",
        ["glass_color_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_product_have_glass"), "product", ["have_glass"], unique=False
    )
    op.create_index(op.f("ix_product_name"), "product", ["name"], unique=False)
    op.create_index(
        op.f("ix_product_orientation"),
        "product",
        ["orientation"],
        unique=False,
    )
    op.create_index(
        op.f("ix_product_price"), "product", ["price"], unique=False
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_product_price"), table_name="product")
    op.drop_index(op.f("ix_product_orientation"), table_name="product")
    op.drop_index(op.f("ix_product_name"), table_name="product")
    op.drop_index(op.f("ix_product_have_glass"), table_name="product")
    op.drop_index(op.f("ix_product_glass_color_id"), table_name="product")
    op.drop_index(op.f("ix_product_covering_id"), table_name="product")
    op.drop_index(op.f("ix_product_color_id"), table_name="product")
    op.drop_index(op.f("ix_product_category_id"), table_name="product")
    op.drop_table("product")
    op.drop_index(op.f("ix_product_size_width"), table_name="product_size")
    op.drop_index(op.f("ix_product_size_thickness"), table_name="product_size")
    op.drop_index(op.f("ix_product_size_height"), table_name="product_size")
    op.drop_table("product_size")
    op.drop_table("product_glass_color")
    op.drop_table("product_covering")
    op.drop_table("product_color")
    op.drop_table("product_category")
    # ### end Alembic commands ###