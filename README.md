# Marks Management System

_A centralized platform for tracking academic performance and enhancing communication between schools, teachers, students, and parents._

---

## 📌 Overview

A web-based system designed to:

- **Track** student grades and academic progress in real-time.
- **Connect** teachers, parents, and administrators through a unified interface.
- **Automate** reporting and data-driven decision-making.

### Key Features

✅ Real-time grade access  
✅ Role-based dashboards (Admin, Teacher, Parent, Student)  
✅ Secure data management (PostgreSQL + JWT)  
✅ Responsive Next.js frontend with Golang backend

---

## 🎯 Problem Statement

### Current Challenges Addressed:

- **Parents**: No real-time visibility into grades, reliance on physical reports.
- **Teachers**: Manual grade entry, inefficient communication.
- **Admins**: Lack of analytics for at-risk students, cumbersome reporting.

---

## 🏗️ Architecture

### Tech Stack

| Layer        | Technology | Key Functionality                   |
| ------------ | ---------- | ----------------------------------- |
| **Frontend** | Next.js    | SSR, WebSocket real-time updates    |
| **Backend**  | Golang     | REST API, JWT auth, data validation |
| **Database** | PostgreSQL | ACID-compliant academic records     |

![High-Level Architecture](media/image2.png)

---

## 👥 User Roles & Permissions

| Feature          | Admin | Teacher | Parent | Student |
| ---------------- | ----- | ------- | ------ | ------- |
| Grade Entry      | ✓     | ✓       | ✗      | ✗       |
| View Grades      | ✓     | ✓       | ✓      | ✓       |
| Generate Reports | ✓     | View    | View   | View    |
