import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

// Validate environment variables
if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is required in production');
  process.exit(1);
}

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-project.vercel.app', 'https://your-domain.com']
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    message: 'CIS Backend API',
    version: '1.0.0',
    status: 'Running ✅',
    endpoints: {
      health: 'GET /health',
      students: 'GET /api/students',
      jobs: 'GET /api/jobs',
      employers: 'GET /api/employers',
    },
    docs: 'See backend/README.md for full API documentation'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// API Routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await prisma.studentProfile.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await prisma.studentProfile.findUnique({
      where: { id: req.params.id },
    });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = await prisma.studentProfile.create({ data: req.body });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create student' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await prisma.studentProfile.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update student' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await prisma.studentProfile.delete({ where: { id: req.params.id } });
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete student' });
  }
});

// Resumes
app.get('/api/resumes', async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

app.post('/api/resumes', async (req, res) => {
  try {
    const resume = await prisma.resume.create({ data: req.body });
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create resume' });
  }
});

app.put('/api/resumes/:id', async (req, res) => {
  try {
    const resume = await prisma.resume.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(resume);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update resume' });
  }
});

// Job Applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await prisma.jobApplication.findMany();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const application = await prisma.jobApplication.create({ data: req.body });
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create application' });
  }
});

app.put('/api/applications/:id', async (req, res) => {
  try {
    const application = await prisma.jobApplication.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update application' });
  }
});

// Appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = await prisma.appointment.create({ data: req.body });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create appointment' });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update appointment' });
  }
});

// Employers
app.get('/api/employers', async (req, res) => {
  try {
    const employers = await prisma.employer.findMany();
    res.json(employers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employers' });
  }
});

app.get('/api/employers/:id', async (req, res) => {
  try {
    const employer = await prisma.employer.findUnique({
      where: { id: req.params.id },
    });
    if (!employer) return res.status(404).json({ error: 'Employer not found' });
    res.json(employer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employer' });
  }
});

app.post('/api/employers', async (req, res) => {
  try {
    const employer = await prisma.employer.create({ data: req.body });
    res.status(201).json(employer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create employer' });
  }
});

app.put('/api/employers/:id', async (req, res) => {
  try {
    const employer = await prisma.employer.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(employer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update employer' });
  }
});

// Jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await prisma.jobPosting.findMany();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { id: req.params.id },
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const job = await prisma.jobPosting.create({ data: req.body });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create job' });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const job = await prisma.jobPosting.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update job' });
  }
});

// Career Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await prisma.careerEvent.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = await prisma.careerEvent.create({ data: req.body });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create event' });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const event = await prisma.careerEvent.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update event' });
  }
});

app.post('/api/events/:id/register', async (req, res) => {
  try {
    const { studentId } = req.body;
    const registration = await prisma.eventRegistration.create({
      data: {
        studentId,
        eventId: req.params.id,
      },
    });
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: 'Failed to register for event' });
  }
});

// Alumni Records
app.get('/api/alumni', async (req, res) => {
  try {
    const alumni = await prisma.alumniRecord.findMany();
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumni records' });
  }
});

app.post('/api/alumni', async (req, res) => {
  try {
    const alumni = await prisma.alumniRecord.create({ data: req.body });
    res.status(201).json(alumni);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create alumni record' });
  }
});

app.put('/api/alumni/:id', async (req, res) => {
  try {
    const alumni = await prisma.alumniRecord.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(alumni);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update alumni record' });
  }
});

// Employer Ratings
app.get('/api/employer-ratings', async (req, res) => {
  try {
    const ratings = await prisma.employerRating.findMany();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employer ratings' });
  }
});

app.post('/api/employer-ratings', async (req, res) => {
  try {
    const rating = await prisma.employerRating.create({ data: req.body });
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create employer rating' });
  }
});

app.put('/api/employer-ratings/:id', async (req, res) => {
  try {
    const rating = await prisma.employerRating.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(rating);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update employer rating' });
  }
});

// Student Ratings
app.get('/api/student-ratings', async (req, res) => {
  try {
    const ratings = await prisma.studentRating.findMany();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student ratings' });
  }
});

app.post('/api/student-ratings', async (req, res) => {
  try {
    const rating = await prisma.studentRating.create({ data: req.body });
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create student rating' });
  }
});

app.put('/api/student-ratings/:id', async (req, res) => {
  try {
    const rating = await prisma.studentRating.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(rating);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update student rating' });
  }
});

// Notifications
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.post('/api/notifications', async (req, res) => {
  try {
    const notification = await prisma.notification.create({ data: req.body });
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create notification' });
  }
});

app.put('/api/notifications/:id', async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(notification);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update notification' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: Prisma connected`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('HTTP server closed');
  });
});

export default app;
