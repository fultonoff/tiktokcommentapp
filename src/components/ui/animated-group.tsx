'use client';
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import React from 'react';

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing';

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: React.ElementType;
  asChild?: React.ElementType;
};

const defaultContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { opacity: 0, filter: 'blur(4px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -180 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { opacity: 0, rotate: -10 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
  },
};

const mergeWithDefaults = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as: Component = 'div',
  asChild: ChildComponent = 'div',
}: AnimatedGroupProps) {
  const itemVariants = variants?.item ?? mergeWithDefaults(preset ? presetVariants[preset] : {});
  const containerVariants = variants?.container ?? defaultContainerVariants;

  const MotionComponent = motion(Component);
  const MotionChild = motion(ChildComponent);

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}

export { AnimatedGroup };
