import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="my-10 px-4 py-3 text-center uppercase  sm:my-16">
      <h1 className="mb-8  text-xl font-semibold text-stone-700">
        The best pizza.
        <br />
        <span className="text-yellow-500 md:text-3xl">
          最好的大披萨，来之g2的顶级厨师，说出吾名，逗汝一笑.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
