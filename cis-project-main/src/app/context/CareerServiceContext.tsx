import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  studentAPI,
  resumeAPI,
  applicationAPI,
  appointmentAPI,
  employerAPI,
  jobAPI,
  eventAPI,
  alumniAPI,
  employerRatingAPI,
  studentRatingAPI,
  notificationAPI,
} from '../api/careerService';

// Types
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  graduationYear: string;
  gpa: string;
  skills: string[];
  bio: string;
}

export interface Resume {
  id: string;
  studentId: string;
  fileName: string;
  version: number;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  fileUrl?: string;
}

export interface JobApplication {
  id: string;
  studentId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  status: 'submitted' | 'under_review' | 'interview' | 'accepted' | 'rejected';
  notes: string;
}

export interface Appointment {
  id: string;
  studentId: string;
  counselorName: string;
  date: string;
  time: string;
  purpose: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Employer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  description: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface JobPosting {
  id: string;
  employerId: string;
  companyName: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  type: 'internship' | 'full-time' | 'part-time';
  salary: string;
  postedDate: string;
  status: 'draft' | 'pending_approval' | 'active' | 'closed';
  applicants: string[];
}

export interface CareerEvent {
  id: string;
  title: string;
  description: string;
  type: 'job_fair' | 'seminar' | 'workshop' | 'networking';
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredStudents: string[];
  status: 'pending_approval' | 'approved' | 'completed' | 'cancelled';
  organizer: string;
  attendanceTracked: boolean;
}

export interface AlumniRecord {
  id: string;
  studentId: string;
  name: string;
  graduationYear: string;
  major: string;
  employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'pursuing_education';
  currentCompany?: string;
  currentPosition?: string;
  salary?: string;
  employedWithinMonths?: number;
  surveyDate: string;
  verified: boolean;
}

export interface EmployerRating {
  id: string;
  employerId: string;
  studentId: string;
  rating: number;
  review: string;
  date: string;
}

export interface StudentRating {
  id: string;
  studentId: string;
  employerId: string;
  rating: number;
  review: string;
  date: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'job_alert' | 'interview_reminder' | 'event_announcement' | 'application_update';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface CareerServiceContextType {
  studentProfile: StudentProfile | null;
  setStudentProfile: (profile: StudentProfile) => void;
  resumes: Resume[];
  addResume: (resume: Resume) => void;
  updateResumeStatus: (id: string, status: Resume['status']) => void;
  applications: JobApplication[];
  addApplication: (application: JobApplication) => void;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  employer: Employer | null;
  setEmployer: (employer: Employer) => void;
  jobPostings: JobPosting[];
  addJobPosting: (job: JobPosting) => void;
  updateJobPosting: (id: string, updates: Partial<JobPosting>) => void;
  allJobPostings: JobPosting[];
  careerEvents: CareerEvent[];
  addCareerEvent: (event: CareerEvent) => void;
  updateCareerEvent: (id: string, updates: Partial<CareerEvent>) => void;
  registerForEvent: (eventId: string, studentId: string) => void;
  alumniRecords: AlumniRecord[];
  addAlumniRecord: (record: AlumniRecord) => void;
  employerRatings: EmployerRating[];
  addEmployerRating: (rating: EmployerRating) => void;
  studentRatings: StudentRating[];
  addStudentRating: (rating: StudentRating) => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
}

const CareerServiceContext = createContext<CareerServiceContextType | undefined>(undefined);

export function CareerServiceProvider({ children }: { children: ReactNode }) {
  const [studentProfile, setStudentProfileState] = useState<StudentProfile | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [employer, setEmployerState] = useState<Employer | null>(null);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [allJobPostings, setAllJobPostings] = useState<JobPosting[]>([]);
  const [careerEvents, setCareerEvents] = useState<CareerEvent[]>([]);
  const [alumniRecords, setAlumniRecords] = useState<AlumniRecord[]>([]);
  const [employerRatings, setEmployerRatings] = useState<EmployerRating[]>([]);
  const [studentRatings, setStudentRatings] = useState<StudentRating[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load all data in parallel
        const [studentsRes, jobsRes, eventsRes] = await Promise.all([
          studentAPI.getAll().catch(() => []),
          jobAPI.getAll().catch(() => []),
          eventAPI.getAll().catch(() => []),
        ]);

        setAllJobPostings(jobsRes || []);
        setCareerEvents(eventsRes || []);
        setError(null);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const setStudentProfile = useCallback(async (profile: StudentProfile) => {
    try {
      const updated = await studentAPI.update(profile.id, profile);
      setStudentProfileState(updated);
    } catch (err) {
      console.error('Failed to update student profile:', err);
    }
  }, []);

  const addResume = useCallback(async (resume: Resume) => {
    try {
      const created = await resumeAPI.create(resume);
      setResumes(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add resume:', err);
    }
  }, []);

  const updateResumeStatus = useCallback(async (id: string, status: Resume['status']) => {
    try {
      await resumeAPI.updateStatus(id, status);
      setResumes(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (err) {
      console.error('Failed to update resume status:', err);
    }
  }, []);

  const addApplication = useCallback(async (application: JobApplication) => {
    try {
      const created = await applicationAPI.create(application);
      setApplications(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add application:', err);
    }
  }, []);

  const updateApplicationStatus = useCallback(async (id: string, status: JobApplication['status']) => {
    try {
      await applicationAPI.updateStatus(id, status);
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      console.error('Failed to update application status:', err);
    }
  }, []);

  const addAppointment = useCallback(async (appointment: Appointment) => {
    try {
      const created = await appointmentAPI.create(appointment);
      setAppointments(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add appointment:', err);
    }
  }, []);

  const setEmployer = useCallback(async (employer: Employer) => {
    try {
      const updated = await employerAPI.update(employer.id, employer);
      setEmployerState(updated);
    } catch (err) {
      console.error('Failed to update employer:', err);
    }
  }, []);

  const addJobPosting = useCallback(async (job: JobPosting) => {
    try {
      const created = await jobAPI.create(job);
      setJobPostings(prev => [...prev, created]);
      setAllJobPostings(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add job posting:', err);
    }
  }, []);

  const updateJobPosting = useCallback(async (id: string, updates: Partial<JobPosting>) => {
    try {
      await jobAPI.update(id, updates);
      setJobPostings(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
      setAllJobPostings(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
    } catch (err) {
      console.error('Failed to update job posting:', err);
    }
  }, []);

  const addCareerEvent = useCallback(async (event: CareerEvent) => {
    try {
      const created = await eventAPI.create(event);
      setCareerEvents(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add career event:', err);
    }
  }, []);

  const updateCareerEvent = useCallback(async (id: string, updates: Partial<CareerEvent>) => {
    try {
      await eventAPI.update(id, updates);
      setCareerEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    } catch (err) {
      console.error('Failed to update career event:', err);
    }
  }, []);

  const registerForEvent = useCallback(async (eventId: string, studentId: string) => {
    try {
      await eventAPI.register(eventId, studentId);
      setCareerEvents(prev =>
        prev.map(e =>
          e.id === eventId
            ? { ...e, registeredStudents: [...e.registeredStudents, studentId] }
            : e
        )
      );
    } catch (err) {
      console.error('Failed to register for event:', err);
    }
  }, []);

  const addAlumniRecord = useCallback(async (record: AlumniRecord) => {
    try {
      const created = await alumniAPI.create(record);
      setAlumniRecords(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add alumni record:', err);
    }
  }, []);

  const addEmployerRating = useCallback(async (rating: EmployerRating) => {
    try {
      const created = await employerRatingAPI.create(rating);
      setEmployerRatings(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add employer rating:', err);
    }
  }, []);

  const addStudentRating = useCallback(async (rating: StudentRating) => {
    try {
      const created = await studentRatingAPI.create(rating);
      setStudentRatings(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add student rating:', err);
    }
  }, []);

  const addNotification = useCallback(async (notification: Notification) => {
    try {
      const created = await notificationAPI.create(notification);
      setNotifications(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to add notification:', err);
    }
  }, []);

  const markNotificationRead = useCallback(async (id: string) => {
    try {
      await notificationAPI.markRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, []);

  return (
    <CareerServiceContext.Provider
      value={{
        studentProfile,
        setStudentProfile,
        resumes,
        addResume,
        updateResumeStatus,
        applications,
        addApplication,
        updateApplicationStatus,
        appointments,
        addAppointment,
        employer,
        setEmployer,
        jobPostings,
        addJobPosting,
        updateJobPosting,
        allJobPostings,
        careerEvents,
        addCareerEvent,
        updateCareerEvent,
        registerForEvent,
        alumniRecords,
        addAlumniRecord,
        employerRatings,
        addEmployerRating,
        studentRatings,
        addStudentRating,
        notifications,
        addNotification,
        markNotificationRead,
      }}
    >
      {children}
    </CareerServiceContext.Provider>
  );
}

export function useCareerService() {
  const context = useContext(CareerServiceContext);
  if (!context) {
    throw new Error('useCareerService must be used within CareerServiceProvider');
  }
  return context;
}