// API Service Layer - Handles all backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Student API calls
export const studentAPI = {
  getAll: async () => apiCall('/students'),
  getById: async (id: string) => apiCall(`/students/${id}`),
  create: async (data: any) =>
    apiCall('/students', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/students/${id}`, { method: 'DELETE' }),
};

// Resume API calls
export const resumeAPI = {
  getAll: async () => apiCall('/resumes'),
  getById: async (id: string) => apiCall(`/resumes/${id}`),
  create: async (data: any) =>
    apiCall('/resumes', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/resumes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateStatus: async (id: string, status: string) =>
    apiCall(`/resumes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  delete: async (id: string) =>
    apiCall(`/resumes/${id}`, { method: 'DELETE' }),
};

// Job Application API calls
export const applicationAPI = {
  getAll: async () => apiCall('/applications'),
  getById: async (id: string) => apiCall(`/applications/${id}`),
  create: async (data: any) =>
    apiCall('/applications', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateStatus: async (id: string, status: string) =>
    apiCall(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  delete: async (id: string) =>
    apiCall(`/applications/${id}`, { method: 'DELETE' }),
};

// Appointment API calls
export const appointmentAPI = {
  getAll: async () => apiCall('/appointments'),
  getById: async (id: string) => apiCall(`/appointments/${id}`),
  create: async (data: any) =>
    apiCall('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/appointments/${id}`, { method: 'DELETE' }),
};

// Employer API calls
export const employerAPI = {
  getAll: async () => apiCall('/employers'),
  getById: async (id: string) => apiCall(`/employers/${id}`),
  create: async (data: any) =>
    apiCall('/employers', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/employers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/employers/${id}`, { method: 'DELETE' }),
};

// Job Posting API calls
export const jobAPI = {
  getAll: async () => apiCall('/jobs'),
  getById: async (id: string) => apiCall(`/jobs/${id}`),
  create: async (data: any) =>
    apiCall('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/jobs/${id}`, { method: 'DELETE' }),
};

// Career Events API calls
export const eventAPI = {
  getAll: async () => apiCall('/events'),
  getById: async (id: string) => apiCall(`/events/${id}`),
  create: async (data: any) =>
    apiCall('/events', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  register: async (eventId: string, studentId: string) =>
    apiCall(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    }),
  delete: async (id: string) =>
    apiCall(`/events/${id}`, { method: 'DELETE' }),
};

// Alumni Records API calls
export const alumniAPI = {
  getAll: async () => apiCall('/alumni'),
  getById: async (id: string) => apiCall(`/alumni/${id}`),
  create: async (data: any) =>
    apiCall('/alumni', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/alumni/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/alumni/${id}`, { method: 'DELETE' }),
};

// Employer Ratings API calls
export const employerRatingAPI = {
  getAll: async () => apiCall('/employer-ratings'),
  getById: async (id: string) => apiCall(`/employer-ratings/${id}`),
  create: async (data: any) =>
    apiCall('/employer-ratings', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/employer-ratings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/employer-ratings/${id}`, { method: 'DELETE' }),
};

// Student Ratings API calls
export const studentRatingAPI = {
  getAll: async () => apiCall('/student-ratings'),
  getById: async (id: string) => apiCall(`/student-ratings/${id}`),
  create: async (data: any) =>
    apiCall('/student-ratings', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/student-ratings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/student-ratings/${id}`, { method: 'DELETE' }),
};

// Notifications API calls
export const notificationAPI = {
  getAll: async () => apiCall('/notifications'),
  getById: async (id: string) => apiCall(`/notifications/${id}`),
  create: async (data: any) =>
    apiCall('/notifications', { method: 'POST', body: JSON.stringify(data) }),
  markRead: async (id: string) =>
    apiCall(`/notifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ read: true }),
    }),
  delete: async (id: string) =>
    apiCall(`/notifications/${id}`, { method: 'DELETE' }),
};
