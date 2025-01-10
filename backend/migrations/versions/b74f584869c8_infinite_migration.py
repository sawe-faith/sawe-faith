"""infinite migration

Revision ID: b74f584869c8
Revises: 2c1015533fe0
Create Date: 2025-01-03 23:18:09.545818

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b74f584869c8'
down_revision = '2c1015533fe0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('about', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('location', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('location')
        batch_op.drop_column('about')

    # ### end Alembic commands ###