import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";

import * as RootMod from "./components/Root";
import * as LandingMod from "./components/Landing";
import * as PortalSelectionMod from "./components/PortalSelection";
import * as AboutMod from "./components/About";
import * as FeaturesMod from "./components/Features";
import * as ContactMod from "./components/Contact";

import * as StudentDashboardMod from "./components/student/StudentDashboard";
import * as StudentProfileMod from "./components/student/StudentProfile";
import * as ResumeManagementMod from "./components/student/ResumeManagement";
import * as ApplicationTrackingMod from "./components/student/ApplicationTracking";
import * as AppointmentBookingMod from "./components/student/AppointmentBooking";
import * as CareerEventsMod from "./components/student/CareerEvents";
import * as AlumniTracerMod from "./components/student/AlumniTracer";
import * as AlumniPortalMod from "./components/student/AlumniPortal";

import * as EmployerDashboardMod from "./components/employer/EmployerDashboard";
import * as EmployerProfileMod from "./components/employer/EmployerProfile";
import * as JobPostingManagementMod from "./components/employer/JobPostingManagement";
import * as ApplicantManagementMod from "./components/employer/ApplicantManagement";

import * as AdminDashboardMod from "./components/admin/AdminDashboard";
import * as AnalyticsDashboardMod from "./components/admin/AnalyticsDashboard";
import * as EventManagementMod from "./components/admin/EventManagement";
import * as ApprovalWorkflowMod from "./components/admin/ApprovalWorkflow";

import * as NotFoundMod from "./components/NotFound";

function pick(mod: Record<string, unknown>, named: string): ComponentType {
  const component = (mod[named] ?? mod.default) as ComponentType | undefined;
  if (!component) {
    throw new Error(`Missing export "${named}" or default export.`);
  }
  return component;
}

const Root = pick(RootMod, "Root");
const Landing = pick(LandingMod, "Landing");
const PortalSelection = pick(PortalSelectionMod, "PortalSelection");
const About = pick(AboutMod, "About");
const Features = pick(FeaturesMod, "Features");
const Contact = pick(ContactMod, "Contact");

const StudentDashboard = pick(StudentDashboardMod, "StudentDashboard");
const StudentProfile = pick(StudentProfileMod, "StudentProfile");
const ResumeManagement = pick(ResumeManagementMod, "ResumeManagement");
const ApplicationTracking = pick(ApplicationTrackingMod, "ApplicationTracking");
const AppointmentBooking = pick(AppointmentBookingMod, "AppointmentBooking");
const CareerEvents = pick(CareerEventsMod, "CareerEvents");
const AlumniTracer = pick(AlumniTracerMod, "AlumniTracer");
const AlumniPortal = pick(AlumniPortalMod, "AlumniPortal");

const EmployerDashboard = pick(EmployerDashboardMod, "EmployerDashboard");
const EmployerProfile = pick(EmployerProfileMod, "EmployerProfile");
const JobPostingManagement = pick(JobPostingManagementMod, "JobPostingManagement");
const ApplicantManagement = pick(ApplicantManagementMod, "ApplicantManagement");

const AdminDashboard = pick(AdminDashboardMod, "AdminDashboard");
const AnalyticsDashboard = pick(AnalyticsDashboardMod, "AnalyticsDashboard");
const EventManagement = pick(EventManagementMod, "EventManagement");
const ApprovalWorkflow = pick(ApprovalWorkflowMod, "ApprovalWorkflow");

const NotFound = pick(NotFoundMod, "NotFound");

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "get-started", Component: PortalSelection },

      { path: "about", Component: About },
      { path: "features", Component: Features },
      { path: "contact", Component: Contact },

      { path: "student", Component: StudentDashboard },
      { path: "student/profile", Component: StudentProfile },
      { path: "student/resume", Component: ResumeManagement },
      { path: "student/applications", Component: ApplicationTracking },
      { path: "student/appointments", Component: AppointmentBooking },
      { path: "student/events", Component: CareerEvents },
      { path: "student/alumni", Component: AlumniPortal },
      { path: "student/alumni/survey", Component: AlumniTracer },

      { path: "employer", Component: EmployerDashboard },
      { path: "employer/profile", Component: EmployerProfile },
      { path: "employer/jobs", Component: JobPostingManagement },
      { path: "employer/applicants", Component: ApplicantManagement },

      { path: "admin", Component: AdminDashboard },
      { path: "admin/analytics", Component: AnalyticsDashboard },
      { path: "admin/events", Component: EventManagement },
      { path: "admin/approvals", Component: ApprovalWorkflow },

      { path: "*", Component: NotFound },
    ],
  },
]);
