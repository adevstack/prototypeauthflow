
# Firebase Studio / Prototype for Orizn

This is a NextJS starter in Firebase Studio, demonstrating a comprehensive authentication module prototype: **Prototype for Orizn**.

To get started, explore the different authentication flows:
- Navigate to `/login` for Email/Password and Social (Google) Sign-In.
- Navigate to `/register` to create a new account.
- Navigate to `/forgot-password` for password recovery simulation (includes AI phishing check).
- Navigate to `/mfa-setup` to see a simulated MFA setup flow.
- Navigate to `/captcha-reminder` for an AI-powered captcha implementation reminder tool.

The application uses a custom theme defined in `src/app/globals.css` and leverages `shadcn/ui` components.

**Key API Endpoints (Conceptual for Prototype):**

*   `/auth/login` (POST): For email/password login.
*   `/auth/register` (POST): For email/password registration.
*   `/auth/google` (GET/POST): To initiate Google Sign-In and handle callback.
*   `/auth/forgot-password` (POST): To request a password reset.
*   `/auth/reset-password` (POST): To set a new password using a token.
*   `/auth/mfa-setup` (POST): To enable MFA for a user.
*   `/auth/mfa-challenge` (POST): To verify an MFA code during login.
*   `/auth/logout` (POST): To log out the user.

**Security Considerations (for Prototype):**

*   **Password Hashing:** Not implemented in this UI-focused prototype, but in a real backend, use `bcrypt` or `Argon2`.
*   **Token Handling:** Session tokens, social auth tokens, and password reset tokens would be managed securely on the backend. This prototype simulates these interactions.
*   **Input Validation:** Basic client-side validation is implemented using `zod`. Server-side validation is crucial in production.
*   **Email Verification:** Simulated via toast notifications. Real implementation requires sending actual emails with verification links.
*   **MFA Secrets:** Secure storage and handling of MFA secrets are critical in production.
*   **CSRF Protection, XSS Prevention, etc.:** Standard web security practices are essential for a production application.

