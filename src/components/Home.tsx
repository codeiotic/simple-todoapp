import { motion } from "framer-motion";
import { FC } from "react";
import HomeStyles from "../styles/Home";
import {
  exitAnimations,
  initialAnimations,
  pageLoadAnimations,
  pageToPageTransition,
} from "../utils";

const Home: FC = () => {
  const classNames = HomeStyles();

  return (
    <motion.div
      exit={exitAnimations}
      initial={initialAnimations}
      animate={pageLoadAnimations}
      transition={pageToPageTransition}
    >
      <main className={classNames.parent}>
        <h1 className={classNames.heading}>Just a simple Todo App</h1>
        <p className={classNames.ghosted}>
          Stores all the Todos you need to do in a day!
        </p>
      </main>
    </motion.div>
  );
};

export default Home;
