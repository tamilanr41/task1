'use client';
import { useState, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AnimatedInput({ label, id, ...props }: Props) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        className="absolute left-4 pointer-events-none text-gray-400"
        initial={false}
        animate={{
          y: focused || hasValue ? -20 : 0,
          scale: focused || hasValue ? 0.85 : 1,
          color: focused ? '#1e3a5f' : '#9ca3af',
        }}
        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
      >
        {label}
      </motion.label>
      <input
        id={id}
        onFocus={() => setFocused(true)}
        onBlur={e => { setFocused(false); setHasValue(!!e.target.value); }}
        onChange={e => { setHasValue(!!e.target.value); props.onChange?.(e); }}
        className="w-full px-4 pt-5 pb-2 border-2 rounded-xl text-sm bg-transparent outline-none transition-all duration-300 focus:border-primary-500 border-gray-200"
        {...props}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-primary-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        style={{ originX: 0 }}
      />
    </div>
  );
}
