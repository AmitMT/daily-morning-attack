import { z } from 'zod';

export const RegisterSchema = z.object({
	username: z
		.string()
		.trim()
		.min(1, 'Username cannot be empty')
		.max(30, 'Username must contain at most 30 characters'),
	email: z.string().trim().min(1, 'Email cannot be empty').email(),
	password: z
		.string()
		.trim()
		.min(8, 'Password must contain at least 8 characters')
		.max(30, 'Password must contain at most 30 characters'),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
	username: z.string(),
	email: z.string().min(1, 'Email cannot be empty').email().trim(),
	password: z
		.string()
		.trim()
		.min(8, 'Password must contain at least 8 characters')
		.max(30, 'Password must contain at most 30 characters'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const CyberAttackSchema = z.object({
	title: z.string().trim().min(1, 'Title cannot be empty'),
	markdownContent: z.string().min(1, 'The content cannot be empty'),
});

export type CyberAttackSchemaType = z.infer<typeof CyberAttackSchema>;
