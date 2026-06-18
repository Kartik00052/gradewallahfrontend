const spring = { type: 'spring', stiffness: 300, damping: 24 };
const springGentle = { type: 'spring', stiffness: 200, damping: 26 };
const springSnappy = { type: 'spring', stiffness: 400, damping: 20 };
const springBouncy = { type: 'spring', stiffness: 350, damping: 14 };

const easeOut = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] };
const easeInOut = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

const springIn = { type: 'spring', stiffness: 260, damping: 28 };

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: spring },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0, transition: spring },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2, ease: 'easeIn' } }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0, transition: spring },
  exit: { opacity: 0, x: 12, transition: { duration: 0.2, ease: 'easeIn' } }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: spring },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2, ease: 'easeIn' } }
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: springGentle },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
      ease: 'easeOut',
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 }
  }
};

export const staggerContainerFast = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 }
  }
};

export const scalePop = {
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springBouncy
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.15, ease: 'easeIn' }
  },
  hover: { scale: 1.04, transition: springSnappy },
  tap: { scale: 0.96, transition: { duration: 0.1 } }
};

export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    transition: spring
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
    transition: springSnappy
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const buttonTap = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: springSnappy
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.08 }
  }
};

export const modalReveal = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 20
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 26 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.18, ease: 'easeIn' }
  }
};

export const overlayFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const accordionExpand = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const accordionIcon = {
  initial: { rotate: 0 },
  animate: { rotate: 180, transition: springSnappy }
};

export const listStagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08
    }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 }
  }
};

export const listItem = {
  initial: { opacity: 0, x: -12 },
  animate: {
    opacity: 1,
    x: 0,
    transition: springGentle
  },
  exit: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.15 }
  }
};

export const slidePageTransition = {
  initial: { opacity: 0, x: 40, scale: 0.98 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 26, mass: 0.9 }
  },
  exit: {
    opacity: 0,
    x: -30,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const shimmer = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: { duration: 1.5, repeat: Infinity, ease: 'linear' }
  }
};

export const notificationSlide = {
  initial: { opacity: 0, x: 80, scale: 0.95 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: springSnappy
  },
  exit: {
    opacity: 0,
    x: 80,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const tooltipReveal = {
  initial: { opacity: 0, scale: 0.9, y: 4 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 22 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 4,
    transition: { duration: 0.12 }
  }
};

export const inputFocusGlow = {
  rest: {
    boxShadow: '0 0 0 0 rgba(99,102,241,0)',
    borderColor: 'rgba(156,163,175,0.3)'
  },
  focus: {
    boxShadow: '0 0 0 3px rgba(99,102,241,0.15)',
    borderColor: 'rgba(99,102,241,0.5)',
    transition: { duration: 0.25, ease: 'easeOut' }
  }
};

export const errorShake = {
  x: [0, -6, 6, -4, 4, 0],
  transition: { duration: 0.35, ease: 'easeInOut' }
};

export const progressBarFill = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: (width) => ({
    scaleX: width,
    transition: { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 }
  })
};

export const countUp = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const skeletonPulse = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 26 }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 }
  }
};

export const scrollReveal = (direction = 'up', distance = 24) => {
  const dirMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };
  return {
    initial: { opacity: 0, ...dirMap[direction] },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: springGentle
    }
  };
};
