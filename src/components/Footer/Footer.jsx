import logo from "../../assets/logo.png";
import pay1 from "../../assets/payment-1.png";
import pay2 from "../../assets/payment-2.png";
import pay3 from "../../assets/payment-3.png";
import pay4 from "../../assets/payment-4.png";
import pay5 from "../../assets/payment-5.png";

function Footer() {
  return (
    <div className="container mt-3 grid lg:grid-cols-6 md:grid-cols-3 p-10 mx-auto text-neutral-800 items-center gap-3">
      <div className="col-span-2">
        <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
        <p className="text-sm  text-neutral-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          at eos vel consequuntur, vero odit?
        </p>
        <ul className="flex gap-4 my-4">
          <li>
            <img src={pay1} alt="pay1" />
          </li>
          <li>
            <img src={pay2} alt="pay2" />
          </li>
          <li>
            <img src={pay3} alt="pay3" />
          </li>
          <li>
            <img src={pay4} alt="pay4" />
          </li>
          <li>
            <img src={pay5} alt="pay5" />
          </li>
        </ul>
      </div>
      <div className="col-span-1 ">
        <h4 className="uppercase text-lg font-medium my-2">Quick Links</h4>
        <ul className="flex flex-col gap-3 text-neutral-600 text-sm">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Blogs</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </ul>
      </div>
      <div className="col-span-1 ">
        <h4 className="uppercase text-lg font-medium my-2">Account</h4>
        <ul className="flex flex-col gap-3 text-neutral-600 text-sm">
          <li>
            <a href="#">My Account</a>
          </li>
          <li>
            <a href="#">Orders Tracking</a>
          </li>
          <li>
            <a href="#">Checkout</a>
          </li>
          <li>
            <a href="#">Wishlist</a>
          </li>
        </ul>
      </div>
      <div className="col-span-2 ">
        <h4 className="uppercase text-lg font-medium my-2">NEWSLETTER</h4>

        <form class="max-w-md mx-auto">
          
          <div class="relative">
            <input
              type="email"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm  text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="Email..."
        
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 rounded-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium  text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Subscribe
            </button>
          </div>
        </form>
        <ul className="flex gap-4 my-4">
          <li className="w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100">
          <a href="#">
          <i class="fa-brands fa-facebook-f "></i>
          </a>
          </li>
          <li className="w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100">
          <a href="#">
          <i class="fa-brands fa-twitter "></i>
          </a>
          </li>
          <li className="w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100">
          <a href="#">
          <i class="fa-brands fa-youtube"></i>
          </a>
          </li>
          <li className="w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100">
          <a href="#">
          <i class="fa-brands fa-instagram"></i>
          </a>
          </li>
          <li className="w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100">
          <a href="#">
          <i class="fa-brands fa-pinterest"></i>
          </a>
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default Footer;
