# Consultation Modal Setup Guide

## EmailJS Configuration

The consultation modal is now integrated with EmailJS for sending emails. Follow these steps to activate it:

### 1. Create an EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account
- Verify your email

### 2. Get Your Credentials

#### a) Public Key
- Go to Account Settings → API Keys
- Copy your **Public Key**

#### b) Create an Email Service
- Go to Email Services
- Add a new service (Gmail recommended)
- Note the **Service ID**

#### c) Create an Email Template
- Go to Email Templates
- Create a new template with the following variables:
  ```
  Subject: New Consultation Request – Meilleur Analytics Website (Testing)
  
  From: {{from_email}}
  Name: {{from_name}}
  Company: {{company}}
  Service: {{service}}
  Message: {{message}}
  ```
- Note the **Template ID**

### 3. Update Environment Variables
Edit `.env.local` in the project root:

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

### 4. Verify Email Recipient
The form will send emails to: `vishnus.21ece@gmail.com`

You can change this in `src/Components/landing/ConsultationModal.jsx` line 62:
```jsx
to_email: 'vishnus.21ece@gmail.com', // Change this email
```

## Features Implemented

✅ Modal dialog with background blur
✅ Form with all required fields
✅ ESC key to close
✅ Click outside to close
✅ Background scroll prevention
✅ Success message display
✅ EmailJS integration
✅ Responsive design (mobile & desktop)
✅ Form validation
✅ Loading state during submission

## Testing

1. Start the dev server: `npm run dev`
2. Click "Request a Consultation" button
3. Fill in the form
4. Submit
5. Check your email for the consultation request

## Notes

- EmailJS free tier: 200 emails/month
- Form fields:
  - Full Name (required)
  - Email Address (required)
  - Company Name (optional)
  - Service (required dropdown)
  - Message (required textarea)
