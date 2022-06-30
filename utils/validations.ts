import { z } from 'zod';

export const emailValidationError = (email: string) => {
  const parseResult = z
    .string()
    .min(1, 'Email cannot be empty')
    .email('Invalid email')
    .safeParse(email);

  if (parseResult.success) return null;
  return parseResult.error.errors[0].message;
};

export const passwordValidationError = (password: string) => {
  const parseResult = z.string().min(1, 'Password cannot be empty').safeParse(password);

  if (parseResult.success) return null;
  return parseResult.error.errors[0].message;
};

export const nameValidationError = (name: string) => {
  const parseResult = z.string().min(1, 'Name cannot be empty').safeParse(name);

  if (parseResult.success) return null;
  return parseResult.error.errors[0].message;
};

export const phoneValidationError = (phone: string) => {
  const parseResult = z
    .string()
    .min(1, 'Phone number cannot be empty')
    .regex(/^\d{10}$/, 'Phone number must contain 10 digits only')
    .safeParse(phone);

  if (parseResult.success) return null;
  return parseResult.error.errors[0].message;
};
