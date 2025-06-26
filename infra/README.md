# Reminder System - Docker Compose Setup

This directory contains the Docker Compose configuration for running the entire reminder system locally.

## Services

- **Frontend**: React/Vite application (port 3000)
- **Backend**: Node.js/Express API (port 5000)
- **PostgreSQL**: Database (port 5432)

## Quick Start

1. **Copy environment file:**
   ```bash
   cp env.example .env
   ```

2. **Edit environment variables:**
   ```bash
   nano .env
   ```

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

5. **Stop services:**
   ```bash
   docker-compose down
   ```

## Environment Variables

### Frontend Configuration
- `FRONTEND_PORT`: Port for frontend service (default: 3000)
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000)
- `VITE_PORT`: Vite development port (default: 3000)

### Backend Configuration
- `BACKEND_PORT`: Port for backend service (default: 5000)
- `NODE_ENV`: Node environment (default: production)

### Database Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `DB_PORT`: Database port (default: 5432)
- `POSTGRES_DB`: Database name (default: reminder_system)
- `POSTGRES_USER`: Database user (default: postgres)
- `POSTGRES_PASSWORD`: Database password (default: password)

### JWT Configuration
- `JWT_SECRET`: Secret key for JWT tokens

### Email Configuration
- `EMAIL_HOST`: SMTP host (e.g., smtp.gmail.com)
- `EMAIL_PORT`: SMTP port (default: 587)
- `EMAIL_USER`: Email username
- `EMAIL_PASS`: Email password/app password
- `EMAIL_FROM`: From email address

### CORS Configuration
- `CORS_ORIGIN`: Allowed origin for CORS (default: http://localhost:3000)

## Development vs Production

### Development
```bash
# Use local database
docker-compose up postgres backend frontend

# Or use external database
DATABASE_URL=your-external-db-url docker-compose up backend frontend
```

### Production
```bash
# Set production environment variables
NODE_ENV=production docker-compose up -d
```

## Health Checks

All services include health checks:
- Frontend: Checks if nginx is serving on port 80
- Backend: Checks `/health` endpoint
- Database: Checks PostgreSQL connectivity

## Volumes

- `postgres_data`: Persistent PostgreSQL data storage

## Networks

- `reminder-network`: Internal network for service communication

## Troubleshooting

### View service logs
```bash
docker-compose logs [service-name]
```

### Rebuild services
```bash
docker-compose build --no-cache
```

### Reset database
```bash
docker-compose down -v
docker-compose up postgres
```

### Access database
```bash
docker-compose exec postgres psql -U postgres -d reminder_system
``` 