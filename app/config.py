# config.py
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    MYSQL_DB: str
    MYSQL_HOSTNAME: str
    DATABASE_PORT: int

    class Config:
        env_file = ".env"

settings = Settings()