# Email Setup for Contact Form

This guide will help you set up email functionality for the contact form so that form submissions are sent to your email address.

## Prerequisites

1. A Gmail account
2. 2-Step Verification enabled on your Google Account

## Setup Steps

### 1. Enable 2-Step Verification

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### 2. Generate App Password

1. In your Google Account settings, go to **Security**
2. Find **App passwords** (under 2-Step Verification)
3. Click **Generate** for a new app password
4. Select **Mail** as the app type
5. Copy the generated 16-character password

### 3. Create Environment File

1. Create a file named `.env.local` in the root directory of your project
2. Add the following content:

```env
# Email Configuration for Contact Form
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Replace:**
- `your-gmail-address@gmail.com` with your actual Gmail address
- `your-16-character-app-password` with the app password you generated

### 4. Restart Development Server

After creating the `.env.local` file, restart your development server:

```bash
pnpm dev
```

## How It Works

1. **Form Submission**: When a user submits the contact form, the data is sent to `/api/contact`
2. **Email Processing**: The API route uses nodemailer to send an email to `saishashank1006@gmail.com`
3. **Email Content**: The email includes:
   - Sender's name, email, and company (if provided)
   - The message content
   - Timestamp and form source information
   - Styled HTML template with S-HATCH branding

## Email Template Features

- **Professional Design**: Clean, modern HTML email template
- **Brand Colors**: Uses S-HATCH cyan and purple gradient
- **Responsive**: Works well on desktop and mobile
- **Formatted Content**: Properly formatted message with line breaks
- **Security**: Only sends to the specified email address

## Troubleshooting

### Common Issues

1. **"Failed to send email" error**
   - Check that your Gmail credentials are correct
   - Ensure 2-Step Verification is enabled
   - Verify the app password is correct

2. **"Authentication failed" error**
   - Make sure you're using an app password, not your regular Gmail password
   - Regenerate the app password if needed

3. **Environment variables not loading**
   - Ensure the `.env.local` file is in the root directory
   - Restart the development server after creating the file

### Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email at `saishashank1006@gmail.com`
4. You should receive a formatted email with the form details

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- App passwords are more secure than regular passwords
- The API route validates required fields before sending emails

## Production Deployment

For production deployment, set the environment variables in your hosting platform:

- **Vercel**: Add environment variables in the Vercel dashboard
- **Netlify**: Add environment variables in the Netlify dashboard
- **Other platforms**: Follow your hosting provider's documentation

The contact form will now send all submissions directly to your email address with a professional, branded email template!
