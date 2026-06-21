import {z} from "zod"


const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(24, 'Username must be at most 24 characters')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Only letters, numbers, dot and underscores are allowed'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[a-z]/, "One lowercase letter required")
    .regex(/[A-Z]/, "One uppercase letter required")
    .regex(/[^A-Za-z0-9]/, "At Least One symbol required"),
})

export default registerSchema;