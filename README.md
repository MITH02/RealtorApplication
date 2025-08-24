# ConstructPro - Construction Project Management System

A comprehensive construction project management system with React Native mobile app and Spring Boot backend, featuring role-based access control, task management, and real-time notifications.

## 🏗️ System Overview

ConstructPro is designed around three primary user roles with distinct responsibilities:

### 👑 Super Admin

- **Limited Role**: Focused on system administration
- **Responsibilities**: Configure and manage Admin accounts only
- **Access**: User management, system configuration, high-level analytics
- **No involvement**: Daily project operations or task assignments

### 🏗️ Admin

- **Central Controller**: Manages all building and task operations
- **Responsibilities**:
  - Create and manage unlimited buildings
  - Assign contractors to projects
  - Define custom task workflows (Civil, Electrical, Plumbing, Tiling, Painting, etc.)
  - Set deadlines and track progress
  - Approve or reject contractor work completions
  - Generate project reports

### 👷 Contractor

- **Task Executor**: Completes assigned tasks efficiently
- **Responsibilities**:
  - View assigned tasks and deadlines
  - Update task progress with photos and notes
  - Mark tasks as completed
  - Request approval from admins
  - Communicate with project administrators

## 🚨 Task Monitoring & Status Tracking

### Deadline Management

- **Red Alerts**: Overdue tasks automatically highlighted (Building + Contractor + Task)
- **Green Status**: Completed on-time tasks marked as successful
- **Automated Notifications**: Real-time deadline reminders and overdue alerts

### Approval Workflow

1. Contractor completes task → Requests approval
2. Admin reviews submission → Approves or Rejects
3. **If Approved**: Task moves to Completed State
4. **If Rejected**: Task returns to Pending with feedback

## 🛠️ Technology Stack

### Mobile App (React Native)

- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **Styling**: Emotion CSS for React Native
- **State Management**: React Context API
- **UI Components**: React Native Paper + Custom Components
- **Platforms**: iOS and Android

### Backend (Spring Boot)

- **Framework**: Spring Boot 3.2.1 with Java 17
- **Database**: PostgreSQL with JPA/Hibernate
- **Authentication**: JWT with Spring Security
- **Documentation**: Swagger/OpenAPI
- **Validation**: Bean Validation with custom validators
- **Scheduling**: Spring Scheduler for deadline tracking

### Key Features

- **Role-based Authentication** with JWT tokens
- **Real-time Notifications** for task updates and deadlines
- **File Upload Support** for progress photos
- **Deadline Tracking** with automated alerts
- **Comprehensive Audit Trail** for all actions
- **RESTful API** with proper error handling
- **Mobile-first Design** optimized for field workers

## 📱 Mobile App Structure

```
mobile-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── StyledComponents.tsx
│   ├── context/             # React Context providers
│   │   └── AuthContext.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/            # App screens
│   │   ├── dashboards/     # Role-specific dashboards
│   │   ├── roles/          # Role information screens
│   │   ├── LoginScreen.tsx
│   │   ├── RoleSelectionScreen.tsx
│   │   └── VideoLoaderScreen.tsx
│   ├── services/           # API integration
│   │   └── api.ts
│   └── styles/             # Styling system
│       └── theme.ts
├── App.tsx                 # Main app component
├── app.json               # Expo configuration
└── package.json
```

## 🔧 Backend Structure

```
backend/
├── src/main/java/com/constructpro/
│   ├── config/             # Spring configuration
│   │   ├── SecurityConfig.java
│   │   └── SchedulingConfig.java
│   ├── controller/         # REST controllers
│   │   ├── AuthController.java
│   │   ├── BuildingController.java
│   │   ├── TaskController.java
│   │   └── NotificationController.java
│   ├── dto/               # Data Transfer Objects
│   │   ├── request/       # Request DTOs
│   │   └── response/      # Response DTOs
│   ├── entity/            # JPA entities
│   │   ├── User.java
│   │   ├── Building.java
│   │   ├── Task.java
│   │   ├── TaskUpdate.java
│   │   ├── Notification.java
│   │   └── BuildingContractor.java
│   ├── repository/        # JPA repositories
│   ├── security/          # Security components
│   │   ├── JwtUtils.java
│   │   ├── AuthTokenFilter.java
│   │   └── UserDetailsServiceImpl.java
│   └── service/           # Business logic
│       ├── BuildingService.java
│       ├── TaskService.java
│       ├── NotificationService.java
│       └── DeadlineTrackingService.java
├── src/main/resources/
│   └── application.yml    # Application configuration
└── pom.xml               # Maven dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Java** 17+
- **PostgreSQL** 12+
- **Maven** 3.6+
- **Expo CLI** for React Native development

### Backend Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd constructpro
```

2. **Set up PostgreSQL database**

```sql
CREATE DATABASE constructpro;
CREATE USER constructpro WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE constructpro TO constructpro;
```

3. **Configure application properties**

```bash
cd backend
# Update src/main/resources/application.yml with your database credentials
```

4. **Run the Spring Boot application**

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**API Documentation**: `http://localhost:8080/swagger-ui.html`

### Mobile App Setup

1. **Install dependencies**

```bash
cd mobile-app
npm install
```

2. **Update API configuration**

```typescript
// src/services/api.ts
const API_BASE_URL = "http://localhost:8080/api"; // Update for your environment
```

3. **Start the development server**

```bash
npm start
```

4. **Run on device/emulator**

```bash
# For iOS
npm run ios

# For Android
npm run android
```

## 📋 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Buildings (Admin/Super Admin only)

- `GET /api/buildings` - Get all buildings
- `POST /api/buildings` - Create new building
- `GET /api/buildings/{id}` - Get building by ID
- `PUT /api/buildings/{id}` - Update building
- `PATCH /api/buildings/{id}/status` - Update building status
- `DELETE /api/buildings/{id}` - Delete building

### Tasks

- `GET /api/tasks/my-tasks` - Get contractor's tasks
- `GET /api/tasks/admin/all` - Get admin's tasks
- `POST /api/tasks` - Create new task (Admin only)
- `PATCH /api/tasks/{id}/progress` - Update task progress
- `PATCH /api/tasks/{id}/complete` - Mark task completed
- `PATCH /api/tasks/{id}/approve` - Approve task (Admin only)
- `PATCH /api/tasks/{id}/reject` - Reject task (Admin only)

### Notifications

- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread` - Get unread notifications
- `PATCH /api/notifications/{id}/read` - Mark as read
- `DELETE /api/notifications/{id}` - Delete notification

## 🔐 Security Features

- **JWT-based Authentication** with access and refresh tokens
- **Role-based Authorization** (Super Admin, Admin, Contractor)
- **CORS Configuration** for mobile app access
- **Password Encryption** using BCrypt
- **Input Validation** with Bean Validation
- **SQL Injection Protection** via JPA/Hibernate

## 📊 Automated Scheduling

The system includes automated scheduling for:

- **Overdue Task Checks**: Every hour
- **Deadline Reminders**: Daily at 9 AM (1-3 days before deadline)
- **Urgent Reminders**: Daily at 6 PM (tasks due tomorrow)
- **Notification Cleanup**: Daily at 2 AM
- **Daily Summaries**: Daily at 8 AM

## 🎯 Key Features Implemented

### ✅ Authentication & Authorization

- [x] JWT-based authentication
- [x] Role-based access control
- [x] Secure password handling
- [x] Token refresh mechanism

### ✅ Building Management

- [x] Create/edit/delete buildings
- [x] Project status tracking
- [x] Contractor assignment
- [x] Progress monitoring

### ✅ Task Management

- [x] Task creation and assignment
- [x] Progress tracking with photos
- [x] Completion workflow
- [x] Approval/rejection system
- [x] Dependency management

### ✅ Notifications & Alerts

- [x] Real-time notifications
- [x] Deadline reminders
- [x] Overdue alerts
- [x] Push notification support

### ✅ Mobile App

- [x] Cross-platform (iOS/Android)
- [x] Offline-capable authentication
- [x] Role-based navigation
- [x] Real-time data synchronization

## 🔄 Data Flow

1. **Super Admin** creates Admin accounts
2. **Admin** creates buildings and assigns contractors
3. **Admin** creates tasks with deadlines and assigns to contractors
4. **Contractor** receives notifications and updates progress
5. **Contractor** marks tasks complete and requests approval
6. **Admin** reviews and approves/rejects completions
7. **System** tracks deadlines and sends automated alerts

## 🚀 Production Deployment

### Backend Deployment

- Configure production database
- Update CORS settings for production domain
- Set secure JWT secrets
- Enable HTTPS
- Configure logging and monitoring

### Mobile App Deployment

- Build production APK/IPA
- Update API endpoints to production URLs
- Configure push notifications
- Test on real devices
- Submit to app stores

## 📞 Support

For technical issues or questions about the ConstructPro system, please refer to the documentation or contact the development team.

---

**ConstructPro** - Streamlining construction project management with modern technology.
