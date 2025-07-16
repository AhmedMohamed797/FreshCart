import {
  faAddressCard,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBabyCarriage,
  faBars,
  faBolt,
  faCartShopping,
  faChevronDown,
  faEllipsis,
  faPerson,
  faPersonDress,
  faRightFromBracket,
  faSpinner,
  faSuitcaseMedical,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router";
import freshCartLogo from "../../assets/Images/freshcart-logo.svg";
import { useContext, useState } from "react";
import { AuthContext } from "./../../Context/Auth.context";
import { CartContext } from "../../Context/Cart.context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartInfo, isLoading } = useContext(CartContext);

  const { logOut, token } = useContext(AuthContext);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header className="text-sm">
        <div className="container">
          {/* Top Navbar */}
          {/* <div className="hidden items-center justify-between border-b border-gray-300/30 py-2 lg:flex">
            <ul className="flex items-center gap-5 *:flex *:items-center *:gap-2">
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
            </ul>

            <ul className="flex items-center gap-5">
              <li>
                <Link to={"track-order"}>Track Order</Link>
              </li>
              <li>
                <Link to={"about"}>About</Link>
              </li>
              <li>
                <Link to={"contact"}>Contact</Link>
              </li>
              <li>
                <select>
                  <option>EGP</option>
                  <option>SAR</option>
                  <option>AED</option>
                </select>
              </li>
              <li>
                <select>
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </li>
            </ul>
          </div> */}

          {/* Main Navigation */}
          <nav className="flex items-center justify-between py-6">
            <h1>
              <Link to={"/"}>
                <img src={freshCartLogo} alt="Fresh Cart Logo" />
              </Link>
            </h1>

            {/* <search className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search for products..."
                className="form-control min-w-80"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute top-1/2 right-2 -translate-1/2"
              />
            </search> */}

            <ul className="hidden items-center gap-6 lg:flex">
              <li>
                <NavLink
                  to={"wishlist"}
                  className={({ isActive }) => {
                    return `${isActive ? "text-primary-500" : ""} hover:text-primary-500 flex flex-col gap-2 transition-colors duration-200`;
                  }}
                >
                  <FontAwesomeIcon className="text-lg" icon={faHeart} />
                  <span className="text-sm">Wishlist</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"cart"}
                  className={({ isActive }) => {
                    return `${isActive ? "text-primary-500" : ""} hover:text-primary-500 flex flex-col gap-2 transition-colors duration-200`;
                  }}
                >
                  <div className="relative">
                    <FontAwesomeIcon
                      className="text-lg"
                      icon={faCartShopping}
                    />
                    <span className="bg-primary-500 absolute top-0 right-0 flex size-4.5 -translate-y-1/2 items-center justify-center rounded-full text-white">
                      {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        (cartInfo?.numOfCartItems ?? 0)
                      )}
                    </span>
                  </div>
                  <span className="text-sm">Cart</span>
                </NavLink>
              </li>

              {/* <li>
                <NavLink
                  to={"account"}
                  className={({ isActive }) => {
                    return `${isActive ? "text-primary-500" : ""} hover:text-primary-500 flex flex-col gap-2 transition-colors duration-200`;
                  }}
                >
                  <FontAwesomeIcon className="text-lg" icon={faUser} />
                  <span className="text-sm">Account</span>
                </NavLink>
              </li> */}

              {!token ? (
                <>
                  <li>
                    <NavLink
                      to={"signup"}
                      className={({ isActive }) => {
                        return `${isActive ? "text-primary-500" : ""} hover:text-primary-500 flex flex-col gap-2 transition-colors duration-200`;
                      }}
                    >
                      <FontAwesomeIcon className="text-lg" icon={faUserPlus} />
                      <span className="text-sm">Signup</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"login"}
                      className={({ isActive }) => {
                        return `${isActive ? "text-primary-500" : ""} hover:text-primary-500 flex flex-col gap-2 transition-colors duration-200`;
                      }}
                    >
                      <FontAwesomeIcon
                        className="text-lg"
                        icon={faAddressCard}
                      />
                      <span className="text-sm">Login</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <li
                  onClick={logOut}
                  className="hover:text-primary-500 flex cursor-pointer flex-col gap-2 transition-colors duration-200"
                >
                  <FontAwesomeIcon
                    className="text-lg"
                    icon={faRightFromBracket}
                  />
                  <span className="text-sm">Logout</span>
                </li>
              )}
            </ul>

            {isMenuOpen ? (
              <button
                className="btn bg-primary-500 text-white lg:hidden"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            ) : (
              <button
                className="btn bg-primary-500 text-white lg:hidden"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
          </nav>
        </div>

        {/* Category Navigation */}
        <nav className="hidden bg-gray-100 py-4 lg:block">
          <div className="container flex gap-8">
            <div className="group relative">
              <button className="btn bg-primary-600 hover:bg-primary-600/90 flex items-center gap-3 text-white">
                <FontAwesomeIcon icon={faBars} />
                <span> All Categories</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>

              <menu className="absolute top-9 z-40 hidden min-w-60 divide-y-2 divide-gray-300/30 rounded-lg bg-white shadow *:p-3 group-hover:block *:hover:bg-gray-100">
                <li>
                  <Link className="flex items-center gap-2" to={""}>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl"
                      fixedWidth
                      icon={faPerson}
                    />
                    <span>Men's Fashion</span>
                  </Link>
                </li>

                <li>
                  <Link className="flex items-center gap-2" to={""}>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl"
                      fixedWidth
                      icon={faPersonDress}
                    />
                    <span>Women's Fashion</span>
                  </Link>
                </li>

                <li>
                  <Link className="flex items-center gap-2" to={""}>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl"
                      fixedWidth
                      icon={faBabyCarriage}
                    />
                    <span>Baby & Toys</span>
                  </Link>
                </li>

                <li>
                  <Link className="flex items-center gap-2" to={""}>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl"
                      fixedWidth
                      icon={faSuitcaseMedical}
                    />
                    <span>Beauty & Health</span>
                  </Link>
                </li>

                <li>
                  <Link className="flex items-center gap-2" to={""}>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl"
                      fixedWidth
                      icon={faBolt}
                    />
                    <span>Electronics</span>
                  </Link>
                </li>

                <li>
                  <Link className="flex items-center gap-2" to={"/categories"}>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl"
                      fixedWidth
                      icon={faEllipsis}
                    />
                    <span>View All Categories</span>
                  </Link>
                </li>
              </menu>
            </div>

            <ul className="flex items-center gap-5">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              {/* <li>
                <NavLink to={"/recently-added"}>Recently Added</NavLink>
              </li> */}
              {/* <li>
                <NavLink to={"/featured-products"}>Featured Products</NavLink>
              </li> */}
              <li>
                <NavLink to={"/deals"}>Deals</NavLink>
              </li>
              <li>
                <NavLink to={"/brands"}>Brands</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* Offcanvas */}
        {isMenuOpen && (
          <>
            <div
              className="background fixed inset-0 z-30 cursor-pointer bg-black/50"
              onClick={toggleMenu}
            ></div>
            <div className="offcanvas animate-slide-in fixed top-0 bottom-0 z-40 space-y-5 bg-white p-5">
              <div className="flex items-center justify-between border-b border-gray-300/50 pb-4">
                <Link to={"/"}>
                  <img src={freshCartLogo} alt="Fresh Cart logo" />
                </Link>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="btn cursor-pointer rounded-full"
                  onClick={toggleMenu}
                />
              </div>

              {/* <search className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="form-control min-w-56 sm:min-w-64"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute top-1/2 right-2 -translate-1/2"
                />
              </search> */}

              <div>
                <h2 className="text-xl font-semibold">Main Menu</h2>
                <ul className="mt-3 space-y-2 transition-colors duration-200 *:hover:bg-gray-100">
                  <li>
                    <NavLink
                      to={"wishlist"}
                      className={({ isActive }) => {
                        return `${isActive ? "text-primary-500 bg-primary-100" : ""} flex gap-2 px-2 py-3 transition-colors duration-200`;
                      }}
                    >
                      <FontAwesomeIcon className="text-lg" icon={faHeart} />
                      <span className="text-sm">Wishlist</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"cart"}
                      className={({ isActive }) => {
                        return `${isActive ? "text-primary-500 bg-primary-100" : ""} flex gap-2 px-2 py-3 transition-colors duration-200`;
                      }}
                    >
                      <div className="relative">
                        <FontAwesomeIcon
                          className="text-lg"
                          icon={faCartShopping}
                        />
                        <span className="bg-primary-500 absolute top-0 right-0 flex size-4.5 -translate-1/2 items-center justify-center rounded-full text-white">
                          {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                          ) : (
                            (cartInfo?.numOfCartItems ?? 0)
                          )}
                        </span>
                      </div>
                      <span className="text-sm">Cart</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"account"}
                      className={({ isActive }) => {
                        return `${isActive ? "text-primary-500 bg-primary-100" : ""} flex gap-2 px-2 py-3 transition-colors duration-200`;
                      }}
                    >
                      <FontAwesomeIcon className="text-lg" icon={faUser} />
                      <span className="text-sm">Account</span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-300/50 pt-5">
                <h2 className="text-xl font-semibold">Account</h2>
                <ul className="space-y-3 transition-colors duration-200 *:hover:bg-gray-100">
                  {!token ? (
                    <>
                      <li>
                        <NavLink
                          to={"signup"}
                          className={({ isActive }) => {
                            return `${isActive ? "text-primary-500 bg-primary-100" : ""} flex gap-2 px-2 py-3 transition-colors duration-200`;
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-lg"
                            icon={faUserPlus}
                          />
                          <span className="text-sm">Signup</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={"login"}
                          className={({ isActive }) => {
                            return `${isActive ? "text-primary-500 bg-primary-100" : ""} flex gap-2 px-2 py-3 transition-colors duration-200`;
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-lg"
                            icon={faAddressCard}
                          />
                          <span className="text-sm">Login</span>
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={logOut}
                      className="flex cursor-pointer gap-2 px-2 py-3 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        className="text-lg"
                        icon={faRightFromBracket}
                      />
                      <span className="text-sm">Logout</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
