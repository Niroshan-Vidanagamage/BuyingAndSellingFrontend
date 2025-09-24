// src/schemas/listing.ts
import { z } from "zod";

export const CreateListingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  description: z.string().max(4000).optional(),
  category: z.enum([
    "HOUSES_LANDS",
    "ELECTRONICS",
    "FURNITURE_HOUSEWARE",
    "SPORTS_EQUIPMENT",
    "VEHICLES",
  ]),
  // coerce lets it accept "123" (string from TextField) and turn it into number
  price: z.coerce.number().min(0, "Price must be ≥ 0"),
  condition: z.enum(["new", "used"]),
  locationCity: z.string().max(120).optional(),
});

export type CreateListingInput = z.infer<typeof CreateListingSchema>;
