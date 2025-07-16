import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import freshCartFullLogo from "../../assets/Images/freshcart-logo.svg";
import freshCartMiniLogo from "../../assets/Images/mini-logo.png";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-gray-400/20 bg-white py-5">
        <div className="container">
          <div className="grid gap-6 py-5 lg:grid-cols-2 xl:grid-cols-5">
            <div className="space-y-3 xl:col-span-2">
              <Link to={"/"}>
                {" "}
                <img src={freshCartFullLogo} alt="Fresh Cart Logo" />
              </Link>

              <p>
                FreshCart is a versatile e-commerce platform offering a wide
                range of products, from clothing to electronics. It provides a
                user-friendly experience for seamless shopping across diverse
                categories.
              </p>

              <ul className="*:hover:text-primary-500 flex items-center gap-4 text-gray-500 *:transition-colors *:duration-200">
                <li>
                  <a href="https://facebook.com" target="_blank">
                    <FontAwesomeIcon className="text-xl" icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank">
                    <FontAwesomeIcon className="text-xl" icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank">
                    <FontAwesomeIcon className="text-xl" icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a href="https://pinterest.com" target="_blank">
                    <FontAwesomeIcon className="text-xl" icon={faPinterestP} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold text-gray-700">
                Categories
              </h2>
              <ul className="*:hover:text-primary-500 *:transiton-colors space-y-3 *:duration-200">
                <li>
                  <Link to={""}>Men's Fashion</Link>
                </li>
                <li>
                  <Link to={""}>Women's Fashion</Link>
                </li>
                <li>
                  <Link to={""}>Baby & Toys</Link>
                </li>
                <li>
                  <Link to={""}>Beauty & Health</Link>
                </li>
                <li>
                  <Link to={""}>Electronics</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold text-gray-700">
                Quick Links
              </h2>
              <ul className="*:hover:text-primary-500 *:transiton-colors space-y-3 *:duration-200">
                <li>
                  <Link to={"/about"}>About us</Link>
                </li>
                <li>
                  <Link to={"/contact"}>Contact Us</Link>
                </li>
                <li>
                  <Link to={"/privacy-policy"}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={"/terms"}>Terms of Service</Link>
                </li>
                <li>
                  <Link to={"/shipping-policy"}>Shipping Policy</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold text-gray-700">
                Customer Service
              </h2>
              <ul className="*:hover:text-primary-500 *:transiton-colors space-y-3 *:duration-200">
                <li>
                  <Link to={"/account"}>My Account</Link>
                </li>
                <li>
                  <Link to={"/orders"}>My Orders</Link>
                </li>
                <li>
                  <Link to={"/wishlist"}>Wishlist</Link>
                </li>
                <li>
                  <Link to={"/returns-and-refunds"}>Returns & Refunds</Link>
                </li>
                <li>
                  <Link to={"/help-center"}>Help Center</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-400/30 py-6">
            <p>
              &copy; {new Date().getFullYear()} FreshCart. All rights reserved
            </p>
            <img src={freshCartMiniLogo} className="w-8" alt="" />
          </div>
        </div>
      </footer>
    </>
  );
}
