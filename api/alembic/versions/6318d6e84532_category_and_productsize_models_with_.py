"""Category and ProductSize models with m2m relation

Revision ID: 6318d6e84532
Revises:
Create Date: 2024-07-10 22:02:13.280348

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "6318d6e84532"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "category",
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("is_glass_available", sa.Boolean(), nullable=False),
        sa.Column("have_material_choice", sa.Boolean(), nullable=False),
        sa.Column("have_orientation_choice", sa.Boolean(), nullable=False),
        sa.Column(
            "have_type_of_platband_choice", sa.Boolean(), nullable=False
        ),
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
        op.f("ix_category_name"), "category", ["name"], unique=False
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
        "category_size_association",
        sa.Column("product_size_id", sa.Integer(), nullable=False),
        sa.Column("category_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["category_id"],
            ["category.id"],
        ),
        sa.ForeignKeyConstraint(
            ["product_size_id"],
            ["product_size.id"],
        ),
        sa.PrimaryKeyConstraint("product_size_id", "category_id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("category_size_association")
    op.drop_index(op.f("ix_product_size_width"), table_name="product_size")
    op.drop_index(op.f("ix_product_size_thickness"), table_name="product_size")
    op.drop_index(op.f("ix_product_size_height"), table_name="product_size")
    op.drop_table("product_size")
    op.drop_index(op.f("ix_category_name"), table_name="category")
    op.drop_table("category")
    # ### end Alembic commands ###