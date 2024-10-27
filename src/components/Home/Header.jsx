function Header({ categories }) {
  return (
    <>
      <div className="grid grid-cols-3  md:grid-cols-4 grid-rows-2 md:grid-rows-3 head-conatiner  gap-3  mt-5 ">
        {categories.slice(0, 7).map((category, index) => {
          return (
            <div
              className="head-card  "
              key={index}
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <div className="content text-xs  my-10 md:text-2xl ">
                <h2> {category.name}</h2>

                <a href="#">Shop now</a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Header;
