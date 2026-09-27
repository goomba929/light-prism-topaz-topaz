import {
  BookOpen,
  Dumbbell,
  Flame,
  Hammer,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { AspectId } from "@/lib/types";

export const ASPECT_ICONS: Record<AspectId, LucideIcon> = {
  body: Dumbbell,
  spirit: Flame,
  kin: Users,
  craft: Hammer,
  mind: BookOpen,
};
