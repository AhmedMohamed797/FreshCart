import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShareNodes,
  faTruckFast,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "../Rating/Rating";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { calcDiscount } from "../../utils/discount.utils";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useContext } from "react";
import { CartContext } from "./../../Context/Cart.context";
import { WishlistContext } from "../../Context/Wishlist.context";
import { Link } from "react-router";

export default function ProductInfo({ productDetails }) {
  const {
    id,
    price,
    priceAfterDiscount,
    quantity,
    ratingsAverage,
    ratingsQuantity,
    title,
    description,
    images,
  } = productDetails;

  const { handleAddingProductToCart } = useContext(CartContext);
  const { handleAddProductToWishlist } = useContext(WishlistContext);
  return (
    <div className="container bg-white p-6">
      <div className="grid grid-cols-1 gap-13 lg:grid-cols-5">
        {/* Left Side - Images */}
        <div className="space-y-4 lg:col-span-2">
          <div className="w-full">
            {/* Container sizing */}
            <ReactImageGallery
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
              items={images.map((image) => ({
                original: image,
                thumbnail: image,
              }))}
              renderItem={(item) => (
                <div className="h-96 w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.original}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              renderThumbInner={(item) => (
                <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            />
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="space-y-4 lg:col-span-3">
          {/* In Stock Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span
                className={`inline-flex ${quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} items-center rounded-full px-3 py-1 text-sm font-medium`}
              >
                {quantity > 0 ? "In Stock" : "Out Of Stock"}
              </span>
              <span
                className={`text-xs font-semibold ${quantity > 0 ? "text-green-700" : "text-red-700"} mt-1 w-fit rounded border border-dashed border-gray-200 bg-gray-50 px-2 py-0.5`}
              >
                {quantity > 0
                  ? `Only ${quantity} left in stock`
                  : "No items left"}
              </span>
            </div>
            <ul className="flex items-center gap-2 text-gray-500">
              <li className="cursor-pointer">
                <FontAwesomeIcon icon={faShareNodes} />
              </li>
              <li
                className="cursor-pointer"
                onClick={() => handleAddProductToWishlist({ id })}
              >
                <FontAwesomeIcon icon={faHeart} />
              </li>
            </ul>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-gray-600">
              <Rating rating={ratingsAverage} />
              <span className="font-semibold">{ratingsAverage}</span>
            </div>
            <span className="font-semibold">({ratingsQuantity} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900 sm:text-3xl">
              {priceAfterDiscount || price} EGP
            </span>

            {priceAfterDiscount && (
              <>
                <del className="text-gray-500 sm:text-xl">{price} EGP</del>
                <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                  {calcDiscount({ price, priceAfterDiscount })}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-4">
            <p className="leading-relaxed text-gray-600">{description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              onClick={() => handleAddingProductToCart({ id })}
              className="btn hover:bg-primary-700 flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 text-white transition-colors duration-500"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add to Cart
            </button>

            <Link
              to={"/"}
              className="btn text-center hover:bg-primary-600 text-primary-600 flex-1 rounded-lg border border-gray-300/50 bg-white px-6 py-3 transition-colors duration-500 hover:text-white"
            >
              <button className="">Continue Shopping</button>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-8 border-t border-gray-100 py-5 *:flex-1 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4 rounded-lg p-3">
              <div className="text-primary-700 bg-primary-400/50 flex size-12 items-center justify-center rounded-full">
                <FontAwesomeIcon icon={faTruckFast} className="text-xl" />
              </div>
              <div>
                <h3 className="mb-0.5 font-semibold">Free Delivery</h3>
                <p className="text-sm text-gray-500">Orders $50 or more</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg p-3">
              <div className="text-primary-700 bg-primary-400/50 flex size-12 items-center justify-center rounded-full">
                <FontAwesomeIcon icon={faRotateLeft} className="text-xl" />
              </div>
              <div>
                <h3 className="mb-0.5 font-semibold">30 Days Return</h3>
                <p className="text-sm text-gray-500">Satisfaction guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
