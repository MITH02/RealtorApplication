# ConstructPro - Construction Management System

A comprehensive construction project management application with role-based access control, task management, and real-time progress tracking.

## 🏗️ Overview

ConstructPro is a full-stack construction management system that enables efficient project coordination between Admins, Builders, and Contractors. The application features a React TypeScript frontend with a Spring Boot backend, providing real-time task management, deadline tracking, and automated notifications.

## 🎯 Key Features

### Role-Based System
- **Admin**: Manage Builder accounts (Create, Read, Update, Delete)
- **Builder**: Create buildings, assign contractors, manage tasks, approve/reject completions
- **Contractor**: View assigned tasks, update progress, mark tasks complete

### Core Functionality
- ✅ **Task Management**: Create, assign, and track construction tasks
- 📊 **Progress Tracking**: Real-time progress updates with visual indicators
- ⏰ **Deadline Management**: Automatic deadline tracking with alerts
- 🔔 **Notifications**: Real-time notifications for task updates and approvals
- 🎨 **Status Indicators**: Color-coded system (🟢 Approved, 🟡 Pending, 🔴 Overdue)
- 📱 **Responsive Design**: Modern UI with Emotion CSS styling

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Emotion CSS** for styling (no Tailwind)
- **React Router 6** for navigation
- **Context API** for state management
- **Vite** for development and building

### Backend
- **Spring Boot 3.2.1** with Java 17
- **PostgreSQL** database
- **Spring Security** with JWT authentication
- **Spring Data JPA** for data persistence
- **Maven** for dependency management

### Architecture
- **RESTful API** design
- **Role-based authentication**
- **DTO pattern** for data transfer
- **Repository pattern** for data access

## 📋 Application Flow

### User Roles & Responsibilities

**1. Admin**
- Sole responsibility: Configure Builder accounts (CRUD operations)
- No involvement in building creation, task assignment, or contractor operations

**2. Builder (Project Owner)**
- Create unlimited buildings
- Assign multiple contractors to each building
- Define tasks/steps (civil work, electrical, plumbing, tiling, painting, etc.)
- Assign deadlines (in days) to each task
- Review and approve/reject task submissions made by contractors

**3. Contractor (Executor)**
- View tasks assigned by the Builder under specific buildings
- Mark tasks as Completed once work is done
- Await Builder's decision: Approval or Rejection

### Task Workflow
1. Builder creates buildings
2. Builder assigns contractors to those buildings
3. Builder defines tasks + sets deadlines
4. Contractor works on assigned tasks
5. Contractor marks task as completed
6. System sends notification to the Builder
7. Builder reviews submission:
   - ✅ **Approved** → Task status = Completed (Green)
   - ❌ **Rejected** → Task status = Pending (Yellow/Orange)

### Deadline & Alerts
- **Overdue Case**: System shows Red Alert with Building Name, Contractor Name, Pending Task Description
- **On-time Completion**: Task is marked Green (Completed)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Java 17+
- PostgreSQL 12+
- Maven 3.6+

### Database Setup
1. Install PostgreSQL and create a database named `constructpro`
2. Default credentials (can be changed in `application.properties`):
   - **Username**: admin
   - **Password**: admin
   - **Port**: 5432

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd constructpro
   ```

2. **Install frontend dependencies**
   ```bash
   pnpm install
   ```

3. **Configure backend database**
   - Update `backend/src/main/resources/application.properties` if needed
   - Default configuration points to `localhost:5432/constructpro`

4. **Start the development server**
   ```bash
   pnpm dev
   ```

   This will start both the frontend and backend servers:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:8080/api

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@constructpro.com | admin123 |
| Builder | builder@constructpro.com | builder123 |
| Contractor | contractor@constructpro.com | contractor123 |

## 📂 Project Structure

```
constructpro/
├── client/                          # React frontend
│   ├── components/
│   │   ├── roles/                   # Role-specific dashboards
│   │   │   ├── AdminDashboard.tsx   # Admin CRUD interface
│   │   │   ├── BuilderDashboard.tsx # Building & task management
│   │   │   └── ContractorDashboard.tsx # Task execution interface
│   │   ├── NotificationsSystem.tsx  # Real-time notifications
│   │   ├── DeadlineTracker.tsx      # Deadline alerts & tracking
│   │   └── RoleSelection.tsx        # Role selection interface
│   ├── contexts/
│   │   └── AuthContext.tsx          # Authentication state management
│   ├── services/
│   │   └── api.ts                   # API service with DTO mapping
│   └── types/
│       └── index.ts                 # TypeScript type definitions
├── backend/                         # Spring Boot backend
│   └── src/main/java/com/constructpro/
│       ├── controller/              # REST controllers
│       ├── entity/                  # JPA entities
│       ├── repository/              # Data repositories
│       ├── service/                 # Business logic
│       ├── dto/                     # Data Transfer Objects
│       └── security/                # Authentication & authorization
└── shared/                          # Shared types between client & server
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

### Admin Operations
- `GET /api/admin/builders` - Get all builders
- `POST /api/admin/builders` - Create new builder
- `PUT /api/admin/builders/{id}` - Update builder
- `DELETE /api/admin/builders/{id}` - Delete builder

### Building Management
- `GET /api/buildings` - Get user's buildings
- `POST /api/buildings` - Create new building
- `PUT /api/buildings/{id}` - Update building
- `DELETE /api/buildings/{id}` - Delete building

### Task Management
- `GET /api/tasks/my-tasks` - Get contractor's tasks
- `POST /api/tasks` - Create new task (Builder only)
- `PATCH /api/tasks/{id}/complete` - Mark task complete
- `PATCH /api/tasks/{id}/approve` - Approve task
- `PATCH /api/tasks/{id}/reject` - Reject task

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/{id}/read` - Mark as read
- `DELETE /api/notifications/{id}` - Delete notification

## 🎨 UI/UX Features

### Design System
- **Color-coded Status Indicators**:
  - 🟢 Green: Completed & Approved
  - 🟡 Yellow/Orange: Pending (Submitted but not approved)
  - 🔴 Red: Overdue (Deadline missed)

### Visual Elements
- Modern glassmorphism design with backdrop blur effects
- Smooth animations and transitions using Emotion CSS
- Responsive grid layouts for optimal viewing on all devices
- Dark mode support with theme persistence

### Interactive Components
- Real-time deadline tracking with countdown timers
- Animated notification panel with slide-in effects
- Progress bars with gradient fills
- Hover effects and micro-interactions

## 🔔 Notification System

### Notification Types
- **Task Assigned**: New task assignment notifications
- **Task Completed**: Task completion notifications to builders
- **Task Approved/Rejected**: Approval status updates to contractors
- **Deadline Reminders**: Automated deadline alerts
- **Overdue Alerts**: Critical overdue task notifications

### Features
- Real-time notification panel
- Unread notification counter with pulse animation
- Mark as read/delete functionality
- Auto-refresh every 30 seconds

## ⏰ Deadline Tracking

### Alert Levels
- **Critical**: Overdue tasks (red, animated)
- **High**: Due today or tomorrow (orange)
- **Medium**: Due within 7 days (yellow)
- **Low**: Future deadlines (green)

### Visual Indicators
- Color-coded deadline countdown
- Pulsing animations for urgent items
- Floating alert notifications
- Dashboard deadline widget

## 🚀 Deployment

### Production Build
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:8080/api

# Backend (application.properties)
spring.datasource.url=jdbc:postgresql://localhost:5432/constructpro
spring.datasource.username=admin
spring.datasource.password=admin
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Type checking
pnpm typecheck
```

## 📱 Mobile Support

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Protected API endpoints
- CORS configuration
- Password encryption
- Session management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the Getting Started guide in the application
- Review the API documentation
- Submit issues for bugs or feature requests

---

**ConstructPro** - Building the future of construction management! 🏗️✨
