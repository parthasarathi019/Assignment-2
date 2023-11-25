import {z} from 'zod';

const fullNameSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

const addressSchema = z.object({
  street: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
});

const userSchema = z.object({
  userId: z.number(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
});

export const UserZodSchema = userSchema;
