/**
 * !NOTE:
 * ! Any changes made to the following objects will result in a major animations change throughout the app.
 * ! Make sure you review these changes before committing them
 */

const exitAnimations = {
  opacity: 0.9,
  backgroundColor: "#002233",
};

const initialAnimations = {
  opacity: 0.9,
};

const pageLoadAnimations = {
  opacity: 1,
};

const pageToPageTransition = { duration: 0.4, ease: "easeInOut" };

export {
  exitAnimations,
  initialAnimations,
  pageLoadAnimations,
  pageToPageTransition,
};
