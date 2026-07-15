import { AnimatePresence as FramerAnimatePresence, motion as framerMotion } from "framer-motion";
import type { ComponentType } from "react";

export const motion = framerMotion as unknown as Record<string, ComponentType<any>>;
export const AnimatePresence = FramerAnimatePresence as ComponentType<any>;
