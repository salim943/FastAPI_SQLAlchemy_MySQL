from .database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean
from sqlalchemy.sql import func
import uuid

class Note(Base):
    __tablename__ = 'notes'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False, unique=True)
    content = Column(String(5000), nullable=False)
    category = Column(String(255), nullable=True)
    published = Column(Boolean, nullable=False, server_default='1')
    createdAt = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updatedAt = Column(TIMESTAMP, default=None, onupdate=func.now())