# Module 8: Graduate Tracer Study Module

## Project Context
**Course:** CIS 303 (Research and Final Project)
**Project Title:** Analytics-Driven Evaluation of Career Resource Services Performance in Higher Education
**Assigned Student:** Ochaves 

## Overview
Universities worldwide face challenges with low graduate employability and fragmented career services. The Graduate Tracer Study Module addresses the manual, inefficient tracking of alumni employment. It provides higher educational institutions with automated tools to trace graduate outcomes, which feeds critical analytics back into the enterprise architecture. This allows for a deeper evaluation of how well the curriculum prepares students for the workforce.

## Transactions & Features Plan

### 1. Alumni Survey Distribution
**Goal:** Automate the distribution of employment surveys to graduates to maximize response rates and reduce manual follow-ups.
- **Trigger-Based Notifications:** The system will automatically generate in-app alerts and notifications to students who have reached their expected graduation year or whom lack an alumni record.
- **Simplified Access:** Students will receive a direct link to the Alumni Tracer Survey to ensure high engagement.
- **Integration Points:** Will tap into the existing notification service to alert alumni smoothly.

### 2. Employment Status Update
**Goal:** Allow graduates to easily report and update their employment progress over time.
- **Dynamic Survey Dashboard:** A dedicated interface where alumni can state their current status (Employed, Unemployed, Self-Employed, Pursuing Education).
- **Comprehensive Fields:** For employed alumni, tracking essential metrics such as:
  - Current company and position/title.
  - Estimated salary range.
  - Number of months it took to secure employment post-graduation.
- **Record Edits:** Alumni won't just submit once; they can return to update their records if they get promoted or change companies. Therefore providing real-time data back to the institution.

### 3. Data Validation
**Goal:** Establish data integrity to ensure metrics fed into the institutional dashboards reflect accurate, clean information.
- **Admin Management Portal:** A centralized dashboard for career counselors or administrative staff to review submitted surveys.
- **Verification Workflow:** Admins can verify employment details by clicking a validation toggle (switching `verified` from `false` to `true`). 
- **Quality Assurance:** Ensures that the Placement and Employment Analytics dashboards rely on validated, credible data, reinforcing the overarching case study on process improvement.

## Next Step
Once you review this plan, the implementation phase will involve creating the User Interface (admin dashboards + student forms) and bridging them with the system's underlying context services and backend logic.
