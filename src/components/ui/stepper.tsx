'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type StepStatus = 'completed' | 'current' | 'pending' | 'upcoming';

interface Step {
  title: string;
  description?: string;
  status: StepStatus;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  variant?: 'numbers' | 'dots';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const statusColors: Record<StepStatus, { circle: string; text: string; line: string }> = {
  completed: { circle: 'bg-success-500 border-success-500', text: 'text-success-700', line: 'bg-success-300' },
  current: { circle: 'bg-primary-500 border-primary-500', text: 'text-primary-700 font-semibold', line: 'bg-primary-200' },
  pending: { circle: 'bg-white border-surface-300', text: 'text-surface-400', line: 'bg-surface-200' },
  upcoming: { circle: 'bg-white border-surface-200', text: 'text-surface-300', line: 'bg-surface-100' },
};

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, variant = 'numbers', orientation = 'horizontal', className }) => {
  const isHorizontal = orientation === 'horizontal';

  const lineVariants = (status: StepStatus, nextStatus: StepStatus) => ({
    initial: { scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 },
    animate: { scaleX: status === 'completed' || nextStatus === 'completed' ? 1 : 0, scaleY: status === 'completed' || nextStatus === 'completed' ? 1 : 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div className={cn(
      isHorizontal ? 'flex items-start' : 'flex flex-col',
      className
    )}>
      {steps.map((step, index) => {
        const colors = statusColors[step.status];
        const isLast = index === steps.length - 1;
        const nextStatus = !isLast ? steps[index + 1].status : undefined;

        return (
          <div key={index} className={cn(
            'flex',
            isHorizontal ? 'flex-col items-center flex-1' : 'flex-row items-start gap-4',
            !isHorizontal && 'relative'
          )}>
            <div className={cn(
              'flex items-center',
              isHorizontal ? 'flex-col' : 'flex-row'
            )}>
              <div className={cn(
                'relative flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 transition-colors duration-300',
                colors.circle,
                step.status === 'current' && 'shadow-lg shadow-primary-500/30'
              )}>
                {step.status === 'completed' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                ) : variant === 'numbers' ? (
                  <span className={cn(
                    'text-sm font-semibold',
                    step.status === 'current' ? 'text-white' : step.status === 'pending' ? 'text-surface-500' : 'text-surface-300'
                  )}>
                    {index + 1}
                  </span>
                ) : (
                  <div className={cn(
                    'w-2.5 h-2.5 rounded-full',
                    step.status === 'current' ? 'bg-white' : step.status === 'pending' ? 'bg-surface-300' : 'bg-surface-200'
                  )} />
                )}
              </div>
            </div>
            {!isLast && (
              <div className={cn(
                isHorizontal ? 'w-full h-0.5 mt-5 mx-0' : 'w-0.5 h-8 ml-5',
                'overflow-hidden bg-surface-200'
              )}>
                <motion.div
                  className={cn('w-full h-full', colors.line)}
                  initial="initial"
                  animate="animate"
                  variants={lineVariants(step.status, nextStatus!)}
                />
              </div>
            )}
            <div className={cn(
              'mt-2',
              isHorizontal ? 'text-center px-2' : 'flex-1 pb-4',
              isLast && !isHorizontal && 'pb-0'
            )}>
              <p className={cn('text-sm', colors.text)}>{step.title}</p>
              {step.description && (
                <p className={cn('text-xs mt-0.5', step.status === 'current' ? 'text-surface-500' : 'text-surface-400')}>
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Stepper, type StepperProps, type Step, type StepStatus };
