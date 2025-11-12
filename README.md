# 🎉 Eventify – A Web-Based Event Notifier for College Events

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwind-css)
![Django](https://img.shields.io/badge/Backend-Django%20REST%20Framework-092E20?logo=django)
![License](https://img.shields.io/badge/License-Academic-lightgrey)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 📘 Overview

*Eventify* is a full-stack web-based event management and notification system designed to modernize college event coordination.  
It automates the *entire event lifecycle* — from creation and approval to registration, attendance tracking, and certificate distribution.

This system replaces manual paperwork, reduces delays, and fosters better engagement among *students, organizers, and administrators* through a centralized, intuitive, and responsive platform.

---

## 🚀 Key Features

### 🔐 User Management
- Role-based access control (Admin, Organizer, Student, Campus Chief)
- Token-based authentication (Django REST Framework)

### 🗓️ Event Lifecycle Automation
- Create, update, approve, and publish events
- Smart scheduling with *overlap detection*
- Automated event approval workflow

### 💬 Smart Notifications
- Real-time in-app and email notifications
- Role-based filtering to prevent unnecessary alerts

### 📝 Event Registration
- Online registration with capacity and deadline management
- Instant confirmation and reminders via email

### 📸 Attendance Tracking
- *QR Code-based attendance system*
- Prevents duplicate scans and fake entries

### 🏆 Certificate Generation
- Auto-generate verifiable PDF certificates
- Each certificate includes a unique verification code

### 📊 Reports & Analytics
- Comprehensive dashboard for admins
- Event stats, attendance rates, and feedback summaries

---

### 🎥 Video Demo and Screenshot

1. **Landing Page**
   
  https://github.com/user-attachments/assets/5b3e3336-ef54-41cf-9fe8-7c08238e68fe
   
2. **Login Page** – Demonstrates user login functionality.
   
   <img width="579" height="543" alt="Image" src="https://github.com/user-attachments/assets/b03ae3f4-257c-4ea1-89fe-bff0798bdd56" />
   
3. **Register Page**
   
   <img width="850" height="868" alt="Image" src="https://github.com/user-attachments/assets/392e42b6-718d-4b81-87c2-00add12666e9" />

4. **Certificate page**
   
   <img width="1169" height="528" alt="Image" src="https://github.com/user-attachments/assets/d60c1c1b-a22d-4f66-8427-fdc5ae663a6d" />
   
5. **Notification Page in app**
   
   <img width="1489" height="776" alt="Image" src="https://github.com/user-attachments/assets/9bfdf6ae-4f79-40dc-905e-d73783550024" />
   
6. **Conflict Detection**
   
   <img width="1613" height="617" alt="Image" src="https://github.com/user-attachments/assets/c8764a03-d918-47e0-be7f-c3f52bfe3bf1" />
   
7. **Feedback Page**
   
   <img width="632" height="536" alt="Image" src="https://github.com/user-attachments/assets/adbb3e5e-1dc7-4b04-b2b5-1989201dfe74" />

8. **Create Event Demo**

   https://github.com/user-attachments/assets/5ec0f765-cb0d-4500-b0ad-bc8e15ab2c96

9. **Department View**

    https://github.com/user-attachments/assets/d5754df9-86ec-4fe4-bf90-45f598cd995c

10. **Organizer QR scan and Edit View**

   https://github.com/user-attachments/assets/ab153b58-3b2e-46ca-b3da-8791d9f9bf8c
   
11. **Django Admin panel View**
    
    https://github.com/user-attachments/assets/b57d1f33-08b5-4c86-ad01-f0dd3c829cdd

12.**Campus-chief Event approve View**

   https://github.com/user-attachments/assets/64e2dbc0-5c97-4e98-bb4c-2f42903afc76

   
## 🧠 Algorithms Used

| Algorithm | Purpose |
|------------|----------|
| *Role-Based Filtering Algorithm* | Ensures targeted notifications per user role |
| *Interval Overlap Detection Algorithm* | Detects and prevents scheduling conflicts |
| *Token-Based Authentication Algorithm* | Provides secure, stateless authentication |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| *Frontend* | React, TypeScript, Tailwind CSS, Vite |
| *Backend* | Django, Django REST Framework |
| *Database* | SQLite |
| *Testing Tools* | Postman, Jest |
| *Version Control* | Git & GitHub |

---

## ⚙️ System Architecture

- *Frontend:* Built as a *Single Page Application (SPA)* using React + TypeScript + Tailwind CSS.
- *Backend:* Django REST Framework powers secure REST APIs and token-based auth.
- *Database:* SQLite for development, easily scalable to PostgreSQL.
- *Notification System:* Role-based real-time alerts and email triggers.
- *QR Attendance:* Secure, time-bound attendance validation via unique QR tokens.

---

## 🧩 Core Modules

1. *Authentication & Authorization* – Secure user management  
2. *Event Management* – CRUD operations for events  
3. *Approval Workflow* – Digital approval from Campus Chief 
4. *Registration & Attendance (QR)* – Simplified student participation tracking  
5. *Certificate Management* – Automated PDF generation and email delivery  
6. *Notifications & Reminders* – Keeps all stakeholders informed  
7. *Reports & Analytics* – Admin insights and metrics dashboard  
8. *Administration Panel* – Manage users, roles, and system data  

---

## 📊 Impact & Results

- Reduced manual workload by *>70%*
- Improved event approval turnaround time
- Enhanced student participation and engagement
- Reliable automated certificate delivery
- Transparent, centralized event coordination

---

## 🔮 Future Enhancements

- 🤖 *AI-based Event Recommendations*
- 🔔 *Real-time notifications via WebSockets*
- 💳 *Integrated payment system* for paid events
- 📱 *Mobile App* for on-the-go access
- 🏫 *Multi-campus support* for inter-college collaboration

---
## 🟢 Getting Started

### Backend (Django + DRF)
```
1. **Clone the repository**  
   
   git clone https://github.com/Carkey-Aakash/Eventify-A-Web-based-Event-Notifier.git
   cd Eventify-A-Web-based-Event-Notifier/backend

2.  Create & activate a virtual environment

# Windows:
python -m venv env
env\Scripts\activate

# macOS/Linux:
python3 -m venv env
source env/bin/activate

3. Install required packages

pip install -r requirements.txt

4. Configure environment variables

Create a .env file (or edit settings.py) with the following example:

DEBUG=True
SECRET_KEY=your_secret_key
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=eventify_db
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=127.0.0.1
DB_PORT=5432

# Frontend origin (allow both ports)
CORS_ALLOWED_ORIGINS=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:5173

EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=noreply@yourdomain.com

5. Run database migrations & create superuser

python manage.py migrate
python manage.py createsuperuser

6. Start the backend server
python manage.py runserver


Backend API root: http://127.0.0.1:8000/
```
### Frontend (React + Vite)
```
1. Navigate to frontend directory
cd ../frontend

2. Install dependencies
npm install

3. Configure API base URL

Create a .env file or update your vite.config.js / API config:
VITE_API_BASE_URL=http://127.0.0.1:8000/api

4. Start the frontend development server
npm run dev

Frontend URL (shown in terminal) can be:
http://localhost:3000 (common default)
