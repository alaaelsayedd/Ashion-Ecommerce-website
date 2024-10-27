import Music from "../../assets/music1.jpg"
import woman from "../../assets/womanFashion.jpg"
import men from "../../assets/men.jpg"
import baby from "../../assets/category-3.jpg"
import supermaret from "../../assets/slider-image-3.jpeg"


let categories = [
  {
    name:"SuperMarket",
    image:supermaret
  },
  {
  name:"Women's Fashion",
  image:woman
},{
  name:"Men's Fashion",
  image:men
},
{
  name:"Baby & Toys",
  image:baby
},


{
  name:"Music",
  image:Music
},
]
function Header() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4    grid-rows-2  head-conatiner  gap-3  mt-5  ">
        {categories.map((category, index) => {
          return (
            <div
              className="head-card  shadow-lg "
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
