import HomeStyles from "../styles/Home";

const Home = (): JSX.Element => {
  const classNames = HomeStyles();

  return (
    <main className={classNames.parent}>
      <h1 className={classNames.heading}>Just a simple Todo App</h1>
      <p className={classNames.ghosted}>
        Stores all the Todos you need to do in a day!
      </p>
    </main>
  );
};

export default Home;
