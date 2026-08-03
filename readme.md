#  Insurance Management Platform

A full-stack web application that digitizes and streamlines insurance operations by enabling administrators, insurance agents, and customers so that they can  efficiently manage policies, claims, premium payments, and documents from a centralized platform.

---

## Overview

Traditional insurance systems often rely on paperwork and manual workflows, making policy management and claim processing time-consuming. This platform automates these processes through a secure, role-based system with dedicated dashboards for different users.

The application supports the complete insurance lifecycle—from customer registration and policy creation to claim submission, verification, approval, premium tracking, and reporting.

---

## ✨ Features

### 👨‍💼 Admin
- Dashboard with business insights
- Manage employees and insurance agents
- Manage customers
- Create and manage insurance policies
- Assign claims to agents
- View analytics and reports

### 🧑‍💼 Insurance Agent
- Register customers
- Create insurance policies
- Verify customer documents
- Review assigned claims
- Approve or reject claims
- Update policy information

### 👤 Customer
- Secure registration & login
- View insurance policies
- Pay premiums
- Submit insurance claims
- Upload supporting documents
- Track claim status

#  Modules

## Customer Management
- Customer Registration
- Customer Profile
- Search Customers
- Customer History
- Edit Customer Details

## Policy Management
- Create Policies
- Active Policies
- Policy Renewal
- Policy Cancellation

## Claim Management
- Submit Claims
- Upload Claim Documents
- Claim Verification
- Claim Approval/Rejection
- Claim History

## Premium Management
- Premium Payment Tracking
- Payment History

## Document Management
- Upload KYC Documents
- Upload Policy Documents
- Secure Document Storage

## Reports & Analytics
- Active Policies
- Premium Collection
- Claim Statistics

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Chart.js 

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Multer
- Zod / Express Validator

## Database
- PostgreSQL
- Prisma ORM

## Other Tools
- Postman
- Git & GitHub

---

# 🗂️ Project Structure

```
Insurance-Management-Platform/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
|   |   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
|   |   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── app.js
|   |   └── server.js
│   └── package.json
|
|── frontend/
│   ├── src/
│   │    ├── assets/
│   │    ├── components/
│   │    ├── context/
│   │    ├── pages/
│   │    ├── routes/
│   │    ├── services/
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── README.md
└── .env
```

---

# 🔐 Authentication

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected Routes
- Secure API Access

---

# 🗄️ Database Schema

### Users
- id
- name
- email
- password_hash
- phone 
- role
- is_active     
- created_at      
- updated_at

### Agents
- id              
- user_id        
- employee_code   
- department      
- created_at     

### Customers
- id
- user_id
- date_of_birth
- address
- id_document_type
- id_document_number
- kyc_status       
- created_at        

### Policies
- id
- policy_number
- policy_type 
- customer_id
- agent_id 
- premium_amount
- coverage_amount 
- premium_frequency 
- start_date
- end_date
- status
- created_at
- updated_at

### Claims
- id
- claim_number 
- policy_id
- customer_id
- description 
- claim_amount
- status
- submitted_date
- verified_by 
- verified_at 
- approved_by 
- approved_at
- rejection_reason

### Premium Payments
- id
- policy_id
- amount
- payment_date
- payment_method
- transaction_ref
- status

### Documents
- id
- owner_type 
- owner_id 
- document_type
- file_url
- uploaded_at
- verification_status 

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/prajapativarsha/insurance-management-platform.git
cd insurance-management-platform
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 📊 Application Workflow

1. Customer registers or is added by an agent.
2. Insurance policy is created.
3. Customer views policy details.
4. Premium payments are recorded.
5. Customer submits a claim.
6. Supporting documents are uploaded.
7. Insurance agent verifies the claim.
8. Claim is approved or rejected.
9. Administrator monitors reports and analytics.

---

# 📈 Future Enhancements

- Email Notifications
- SMS Alerts
- Payment Gateway Integration
- AI-based Fraud Detection
- OCR for Document Verification
- Multi-language Support
- Mobile Application
- Cloud File Storage

---

# 📄 License

This project is developed for educational and learning purposes.

---

# 👨‍💻 Author

**Varsha**

Final Year B.Tech CSE Student

If you found this project helpful, consider giving it a ⭐ on GitHub!