# **App Name**: AuthFlow Architect

## Core Features:

- Email/Password Login: Provides a UI form for email and password login with input validation.
- Social Sign-In (Google): Handles initiating the Google sign-in flow.
- Email/Password Account Creation: Provides a UI form to create an account via email/password, including confirmation.
- Multi-Factor Authentication (MFA) Setup: Allows users to set up MFA, such as generating and displaying backup codes.
- MFA Challenge: Challenges users for MFA during login, verifying a code (e.g., from an authenticator app).
- Password Recovery: Handles password reset requests, sending a simulated email with a reset link/token. This module can use a GenAI tool to identify phishing attempts from email addresses based on public info before the reset email is actually sent out
- Captcha Reminder Tool: Identifies a common captcha provider to assist developers, and reminds them to add captcha to the login system, if desired.

## Style Guidelines:

- Primary color: A vibrant indigo (#663399) to signify trust and security in authentication processes. This color provides a balance between a professional feel and a modern, engaging aesthetic.
- Background color: Light gray (#F0F0F0) to ensure readability and reduce eye strain during extended use. The desaturated background keeps the focus on the forms and important elements.
- Accent color: A soft violet (#A782C9), analogous to indigo but with higher brightness, is used for interactive elements like buttons and links. This subtle contrast helps guide the user through the authentication flows.
- Use clear and consistent typography for all labels, instructions, and error messages.
- Incorporate simple, recognizable icons to enhance usability, such as lock icons for password fields or key icons for account settings.
- Maintain a clean and organized layout with ample spacing to prevent a cluttered interface.