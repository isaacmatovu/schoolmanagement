# 📚 Marks Management System

A **cloud-based academic platform** built with Next.js and Firebase that streamlines grade management, enhances educator-parent communication, and provides real-time student performance analytics.

## 🌟 Features

### Core Functionality
- **Real-time Grade Tracking**: Instant updates visible to authorized users
- **Multi-role Dashboards**:
  - Admin: School-wide analytics & reporting
  - Teachers: Grade entry with validation
- **Automated Report Generation**: PDF exports with institutional branding

### Firebase-Powered Infrastructure
- 🔐 **Authentication**: Firebase Auth with role-based access
- 🗃️ **Database**: Firestore with optimized data structure
- ⚡ **Serverless Functions**: Firebase Cloud Functions for backend logic
- 📁 **Storage**: Secure document repository for report cards

## 🛠️ Tech Stack

| Component       | Technology                          |
|-----------------|-------------------------------------|
| Frontend        | Next.js 14 (App Router)             |
| State Management| React Context + Zustand             |
| Backend         | Firebase Services                   |
| UI              | Tailwind CSS                        |
| CI/CD           | GitHub Actions + Firebase Hosting   |

## 📦 Installation

### Prerequisites
- Node.js v18+
- Firebase project 
- Firebase CLI (`npm install -g firebase-tools`)

### Setup Steps
1. Clone repository:
   ```bash
   git clone https://github.com/isaacmatovu/schoolmanagement
   cd schoolmanagement
