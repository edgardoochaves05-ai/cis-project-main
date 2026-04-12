# Backend Setup & PostgreSQL Installation Guide

## Windows Setup Instructions

### Step 1: Download & Install PostgreSQL

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember your **superuser password** (postgres user)
4. Port: **5432** (default)
5. Complete the installation

### Step 2: Verify PostgreSQL Installation

Open PowerShell and run:
```powershell
psql --version
```

You should see: `psql (PostgreSQL) X.X.X`

### Step 3: Create Database

Open PowerShell:
```powershell
psql -U postgres
```

When prompted for password, enter the password you set during installation.

Then run:
```sql
CREATE DATABASE cis_db;
\l
```

You should see `cis_db` in the list. Exit with `\q`

### Step 4: Install Node.js Dependencies

Navigate to the backend folder:
```powershell
cd backend
npm install
```

### Step 5: Configure Environment

Update `backend/.env`:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/cis_db"
PORT=5000
NODE_ENV=development
```

Replace `YOUR_PASSWORD` with the PostgreSQL password you created.

### Step 6: Initialize Prisma

```powershell
npm run prisma:generate
npm run prisma:migrate
```

Choose a name for the migration (e.g., "init")

This will:
- Generate Prisma Client (TypeScript types)
- Create all tables in your database
- Create migration file

### Step 7: Start Backend Server

```powershell
npm run dev
```

You should see:
```
✅ Server running on http://localhost:5000
📊 Database: Prisma connected
```

## Verify Everything Works

### Test 1: Check Server Health
```
GET http://localhost:5000/health
```

Response: `{ "status": "Backend is running" }`

### Test 2: Check Database Connection
```
GET http://localhost:5000/api/students
```

Response: `[]` (empty array)

## Troubleshooting

### "Connection refused" error
- Ensure PostgreSQL is running
- Check if port 5432 is correct
- Verify DATABASE_URL in .env

### "Database does not exist" error
- Make sure you created the database:
```powershell
psql -U postgres -c "CREATE DATABASE cis_db;"
```

### "Authentication failed" error
- Check password in DATABASE_URL matches PostgreSQL password
- Try connecting directly:
```powershell
psql -U postgres -h localhost -d cis_db
```

## Project Structure

```
cis-project/
├── src/                    # React Frontend
├── backend/                # Node.js Backend (NEW)
│   ├── src/
│   │   ├── index.ts          # Express server
│   │   ├── database.ts       # Prisma setup
│   │   ├── controllers/      # API logic
│   │   └── routes/           # API endpoints
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                  # Configuration
│   └── README.md
└── package.json            # Frontend
```

## Frontend & Backend Integration (Next Steps)

Once backend is running:

1. **Update Frontend** to call backend API instead of localStorage
2. **Add Authentication** (JWT tokens)
3. **Handle CORS** (already configured)
4. **Test API endpoints**

Example API call from frontend:
```typescript
// Instead of: localStorage.getItem('studentProfile')
// Do: 
const response = await fetch('http://localhost:5000/api/students/123');
const student = await response.json();
```

## Database Management

### View Database Visually
```powershell
npm run prisma:studio
```
Opens http://localhost:5555 with visual database browser

### Connect to Database Directly
```powershell
psql -U postgres -d cis_db
```

### Useful SQL Commands
```sql
\l              -- List databases
\dt             -- List tables
\d users        -- Describe 'users' table
SELECT * FROM student_profiles;  -- Query data
\q              -- Exit
```

## Next: Authentication Setup

Once backend is stable, implement:
1. User registration & login
2. JWT tokens
3. Role-based access control (STUDENT/EMPLOYER/ADMIN)
4. Password hashing (bcrypt)

See the backend README.md for more details.
