import { z, ZodError } from "zod";

// const userAge = 17;
// const ageSchema = z.number().max(100).min(18);

// const {error,data,success} = ageSchema.safeParse(userAge);

// console.log(error.issues[0].message);  // same work but different way

// try {
//   const paseUserAge = ageSchema.parse(userAge);
//   console.log(paseUserAge);
// } catch (error) {
//   if (error instanceof ZodError) {
//     console.log(error.issues[0].message);
//   }
// }

const portSchema = z.coerce.number().min(1).max(654565).default(3000);

export const PORT = portSchema.parse(process.env.PORT);
