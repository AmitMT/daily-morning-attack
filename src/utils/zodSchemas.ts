import { z } from 'zod';

export const RegisterSchema = z.object({
	username: z
		.string()
		.min(1, 'Username cannot be empty')
		.max(30, 'Username must contain at most 30 characters')
		.trim(),
	email: z.string().min(1, 'Email cannot be empty').email().trim(),
	password: z
		.string()
		.min(8, 'Password must contain at least 8 characters')
		.max(30, 'Password must contain at most 30 characters')
		.trim(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
	username: z.string(),
	email: z.string().min(1, 'Email cannot be empty').email().trim(),
	password: z
		.string()
		.min(8, 'Password must contain at least 8 characters')
		.max(30, 'Password must contain at most 30 characters')
		.trim(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
