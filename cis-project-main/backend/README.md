# CIS Backend - Node.js + Prisma + PostgreSQL

Career Information System Backend API

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v12+)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database

Create a PostgreSQL database:
```sql
CREATE DATABASE cis_db;
```

Update `.env` with your database credentials:
```
DATABASE_URL="postgresql://username:password@localhost:5432/cis_db"
PORT=5000
NODE_ENV=development
```

### 3. Setup Prisma

Generate Prisma client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

This will:
- Create all database tables
- Set up relationships and constraints
- Generate TypeScript types

### 4. Start Development Server

```bash
npm run dev
```

Server will be available at `http://localhost:5000`

## Available Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get specific student
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Jobs
- `GET /api/jobs` - Get all job postings
- `GET /api/jobs/:id` - Get specific job posting
- `POST /api/jobs` - Create new job posting
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting

### Employers
- `GET /api/employers` - Get all employers
- `GET /api/employers/:id` - Get specific employer
- `POST /api/employers` - Create new employer
- `PUT /api/employers/:id` - Update employer
- `DELETE /api/employers/:id` - Delete employer

## Project Structure

```
backend/
├── src/
│   ├── index.ts                 # Main Express server
│   ├── database.ts              # Prisma database config
│   ├── controllers/             # Business logic
│   │   ├── studentController.ts
│   │   ├── jobController.ts
│   │   └── employerController.ts
│   └── routes/                  # API routes
│       ├── studentRoutes.ts
│       ├── jobRoutes.ts
│       └── employerRoutes.ts
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── package.json
├── tsconfig.json
└── .env                         # Environment variables
```

## Database Schema

See [prisma/schema.prisma](prisma/schema.prisma) for the complete schema.

### Key Tables:
- `users` - User accounts with roles
- `student_profiles` - Student information
- `employers` - Employer companies
- `job_postings` - Job listings
- `job_applications` - Student applications
- `resumes` - Resume files
- `appointments` - Counselor appointments
- `career_events` - Career fairs, seminars
- `alumni_records` - Alumni tracking
- `notifications` - User notifications

## Next Steps

- [ ] Add authentication (JWT)
- [ ] Add user roles & permissions
- [ ] Add file upload handling (resumes)
- [ ] Add email notifications
- [ ] Add analytics endpoints
- [ ] Deploy to production

## Useful Commands

```bash
# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# View/edit database visually
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate
```

## Troubleshooting

**Connection Error?**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Make sure database exists

**Migration Error?**
- Run `npm run prisma:generate` first
- Check migration files in `prisma/migrations/`

## Frontend Integration

To connect your React frontend:

1. Update API base URL in frontend environment
2. Replace localStorage calls with API fetch calls
3. Add authentication headers to requests

Example:
```typescript
const response = await fetch('http://localhost:5000/api/students', {
  headers: {
    'Content-Type': 'application/json',
    // Add auth token here
  }
});
```
