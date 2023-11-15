import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface TransitionProps extends HTMLMotionProps<"div"> {
  show: boolean;
  children: React.ReactNode;
}

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 48 },
};

const Transition = ({ show, children, ...props }: TransitionProps) => {
  return (
    <motion.div
      animate={show ? "open" : "closed"}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
