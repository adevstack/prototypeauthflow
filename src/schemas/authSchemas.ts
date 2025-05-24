
import { z } from 'zod';

export const passwordRequirements = [
  { regex: /.{8,}/, message: "Be at least 8 characters long." },
  { regex: /[a-z]/, message: "Contain at least one lowercase letter." },
  { regex: /[A-Z]/, message: "Contain at least one uppercase letter." },
  { regex: /[0-9]/, message: "Contain at least one number." },
  { regex: /[^a-zA-Z0-9]/, message: "Contain at least one special character." },
];

const passwordSchema = z.string()
  .refine(val => passwordRequirements[0].regex.test(val), { message: passwordRequirements[0].message })
  .refine(val => passwordRequirements[1].regex.test(val), { message: passwordRequirements[1].message })
  .refine(val => passwordRequirements[2].regex.test(val), { message: passwordRequirements[2].message })
  .refine(val => passwordRequirements[3].regex.test(val), { message: passwordRequirements[3].message })
  .refine(val => passwordRequirements[4].regex.test(val), { message: passwordRequirements[4].message });


export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberDevice: z.boolean().optional(),
});
export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Show error under confirmPassword field
});
export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});
export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export const MfaChallengeSchema = z.object({
  code: z.string().length(6, { message: "MFA code must be 6 digits." }).regex(/^\d{6}$/, { message: "MFA code must be numeric and 6 digits long." }),
});
export type MfaChallengeFormData = z.infer<typeof MfaChallengeSchema>;
