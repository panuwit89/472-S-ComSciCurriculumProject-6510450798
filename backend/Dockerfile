FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    pkg-config \
    default-libmysqlclient-dev \
    python3-dev \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy project first to access .env.example
COPY . .

# Copy .env.example to .env if it doesn't exist
RUN cp -n .env.example .env || true

# Install python dependencies
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirement.txt

# Create a startup script
RUN echo '#!/bin/bash\n\
# Wait for the database to be ready\n\
sleep 10\n\
# Apply migrations\n\
python manage.py makemigrations\n\
python manage.py migrate\n\
# Start the server\n\
python manage.py runserver 0.0.0.0:8000\n'\
> /app/start.sh && chmod +x /app/start.sh

# Expose port 8000
EXPOSE 8000

# Run startup script
CMD ["/app/start.sh"]