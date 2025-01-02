export const easings = {
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
};

export const textRevealMotion = (delay: number) => {
  return {
    initial: { y: 100, opactiy: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.8,
        ease: easings.easeOutQuart,
      },
    },
  };
};

export const dividerMotion = {
  initial: {
    scaleX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      delay: 0.6,
      duration: 0.8,
      ease: easings.easeInOutQuint,
    },
  },
};

export const arrowMotion = {
  hover: {
    rotate: -90,
    transition: {
      type: 'spring',
      bounce: 0.5,
      duration: 0.5,
    },
  },
};

export const itemContentMotion = {
  hover: {
    width: '5ch',
    transition: { type: 'spring', bounce: 0.5, duration: 0.5 },
  },
};
