-- ConstructPro Database Initialization Script
-- This script creates the database and sets up initial data

-- Create database (this is handled by docker-compose)
-- The database 'constructpro' is already created via POSTGRES_DB environment variable

-- Grant permissions to admin user
GRANT ALL PRIVILEGES ON DATABASE constructpro TO admin;

-- Create initial admin user (password will be hashed by the application)
-- This will be handled by the application's data initialization

-- Enable UUID extension for future use
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance (these will be created by Hibernate)
-- But we can add any custom indexes here if needed

-- Initial data will be inserted by the Spring Boot application
-- through data initialization or migration scripts
