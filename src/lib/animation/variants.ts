import { Variants, Transition } from 'framer-motion';

export const easeOutExpo: Transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
export const easeOutCubic: Transition = { duration: 0.5, ease: [0.33, 1, 0.68, 1] };
export const easeInOut: Transition = { duration: 0.6, ease: [0.76, 0, 0.24, 1] };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: easeOutExpo },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: easeOutExpo },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOutExpo.ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: easeOutExpo },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: easeOutExpo },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: easeOutExpo },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const lineReveal: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: easeOutExpo },
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0 0)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

export const progressFill = (duration: number = 1.5): Variants => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration, ease: [0.16, 1, 0.3, 1] } },
});

export const scaleOnHover = {
  whileHover: { scale: 1.03, transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] } },
  whileTap: { scale: 0.97 },
};

export const liftOnHover = {
  whileHover: { y: -4, transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] } },
  whileTap: { y: 0 },
};
