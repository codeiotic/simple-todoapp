import { FC } from "react";
import { motion } from "framer-motion";
import ErrorStyles from "../styles/Error";

interface Props {
  message: string;
}

const Error: FC<Props> = ({ message }) => {
  const classNames = ErrorStyles();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.div
      className={classNames.errorBg}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.ul className={classNames.list}>
        <motion.li variants={item}>{message}</motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default Error;
