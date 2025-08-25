# ConstructPro Setup and Testing Guide

## Overview

ConstructPro is a comprehensive construction project management application with three user roles:
- **Admin**: Manages Builder accounts (CRUD operations)
- **Builder**: Creates buildings, assigns contractors, manages tasks, approves/rejects submissions
- **Contractor**: Executes assigned tasks and reports progress

## Prerequisites

- Node.js 18+ 
- Java 17+
- Maven 3.6+
- PostgreSQL 15+
- Docker (optional, for easier database setup)

## Database Setup

### Option 1: Using Docker (Recommended)

```bash
# Start PostgreSQL database
docker-compose up -d postgres

# Check if database is running
docker-compose ps
```

### Option 2: Manual PostgreSQL Setup

1. Install PostgreSQL 15+
2. Create database and user:

```sql
CREATE DATABASE constructpro;
CREATE USER admin WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE constructpro TO admin;
```

## Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Build the application:**
```bash
mvn clean compile
```

3. **Run the application:**
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Default Test Users

The application creates default users on startup:

- **Admin**: admin@constructpro.com / admin123
- **Builder**: builder@constructpro.com / builder123  
- **Contractor**: contractor@constructpro.com / contractor123

## Frontend Setup

1. **Navigate to client directory:**
```bash
cd client
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Start development server:**
```bash
pnpm dev
```

The frontend will start on `http://localhost:5173`

## Testing the Application

### 1. Database Connection Test

Check that the backend connects to PostgreSQL:
- Look for `"Connected to PostgreSQL"` in backend logs
- Check for successful table creation in logs

### 2. Authentication Test

1. Go to `http://localhost:5173`
2. Click "Get Started"
3. Select a role (Admin/Builder/Contractor)
4. Click "Login" button
5. Use one of the default test accounts

### 3. Role-Based Functionality Test

#### Admin Dashboard
- Login as admin@constructpro.com / admin123
- Should see builder management interface
- Test creating a new builder account
- Test activating/deactivating builders

#### Builder Dashboard  
- Login as builder@constructpro.com / builder123
- Should see building and task management interface
- Test creating a new building
- Test creating and assigning tasks

#### Contractor Dashboard
- Login as contractor@constructpro.com / contractor123
- Should see assigned tasks interface
- Test updating task progress
- Test marking tasks as complete

### 4. API Endpoint Tests

Test backend APIs directly:

```bash
# Health check
curl http://localhost:8080/actuator/health

# Login test
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@constructpro.com","password":"admin123"}'

# Get buildings (requires auth token)
curl -X GET http://localhost:8080/api/buildings \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Configuration Fixed

The following critical configuration issues have been resolved:

### 1. JWT Configuration
- Fixed property name mismatch between `application.properties` and `JwtUtils.java`
- JWT authentication should now work correctly

### 2. CORS Configuration  
- Fixed property name mismatch for CORS allowed origins
- Frontend should now communicate with backend properly

### 3. Security Roles
- Removed invalid `SUPER_ADMIN` role references
- Aligned with actual User.Role enum (ADMIN, BUILDER, CONTRACTOR)

### 4. Database Compatibility
- Fixed non-portable SQL functions for PostgreSQL
- Added proper repository annotations

## New Features Implemented

### Building-Contractor Assignment
- New API endpoints for assigning contractors to buildings
- Proper role-based access control
- Notification system integration

### Enhanced API Service
- Complete TypeScript types matching backend DTOs
- All CRUD operations for buildings, tasks, and user management
- Building-contractor assignment endpoints

## Application Flow

1. **Admin Workflow:**
   - Login → Builder Management → Create/Update/Delete Builders

2. **Builder Workflow:**
   - Login → Building Management → Create Buildings → Task Management → Assign Tasks to Contractors → Review Submissions

3. **Contractor Workflow:**
   - Login → View Assigned Tasks → Update Progress → Mark Complete → Await Approval

## Troubleshooting

### Backend Issues

1. **Database Connection Error:**
   - Check PostgreSQL is running
   - Verify connection string in `application.properties`
   - Check username/password

2. **JWT Token Error:**
   - Verify JWT secret is properly configured
   - Check token expiration settings

3. **Build Errors:**
   - Ensure Java 17+ is installed
   - Run `mvn clean install` to resolve dependencies

### Frontend Issues

1. **API Connection Error:**
   - Check backend is running on port 8080
   - Verify CORS configuration
   - Check browser console for errors

2. **Build Errors:**
   - Run `pnpm install` to install dependencies
   - Check Node.js version (18+ required)

### Database Issues

1. **Connection Refused:**
   - Check PostgreSQL is running on port 5432
   - Verify user permissions

2. **Schema Errors:**
   - Check Hibernate DDL auto-update is enabled
   - Verify table creation in logs

## Next Steps

The application now has:
✅ Fixed critical configuration issues
✅ Complete backend API implementation
✅ Frontend-backend integration
✅ Role-based authentication and authorization
✅ Building-contractor assignment system

Remaining items to implement:
- Enhanced notifications system
- Real-time deadline tracking
- File upload for task updates
- Email notifications
- Advanced reporting and analytics

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review application logs for error messages
3. Verify all prerequisites are installed correctly
4. Test with the provided default user accounts first
