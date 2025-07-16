import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCodeCompare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calcDiscount } from "../../utils/discount.utils";
import Rating from "./../Rating/Rating";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "./../../Context/Cart.context";
import { WishlistContext } from "../../Context/Wishlist.context";

export default function ProductCard({ productInfo }) {
  const {
    id,
    imageCover,
    price,
    priceAfterDiscount,
    ratingsAverage,
    ratingsQuantity,
    category,
    title,
  } = productInfo;

  const { handleAddingProductToCart } = useContext(CartContext);
  const { handleAddProductToWishlist } = useContext(WishlistContext);

  return (
    <>
      <div className="card relative overflow-hidden rounded-xl bg-white shadow-lg">
        <div>
          <Link to={`/products/${id}`} className="block">
            <img src={imageCover} className="mx-auto h-60" />
          </Link>
        </div>

        <div className="content space-y-2 p-4">
          <div className="head-content">
            <span className="text-sm text-gray-500">{category.name}</span>
            <h2 className="line-clamp-1 font-medium">
              <Link to={`/products/${id}`} className="line-clamp-1">
                {title}
              </Link>
            </h2>
          </div>

          <div className="rating flex items-center gap-2">
            <Rating rating={ratingsAverage} />
            <div className="space-x-1">
              <span>{ratingsAverage}</span>
              <span>({ratingsQuantity})</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="price space-x-2">
              <span className="text-primary-600 text-lg font-semibold">
                {priceAfterDiscount ? priceAfterDiscount : price} EGP
              </span>
              {priceAfterDiscount && (
                <del className="text-sm text-gray-500">{price} EGP</del>
              )}
            </div>

            <button
              className="btn hover:bg-primary-700 bg-primary-600 size-9 rounded-full p-0 text-white"
              onClick={() => handleAddingProductToCart({ id })}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="actions *:hover:text-primary-600 absolute top-4 right-4 flex flex-col gap-4 text-gray-500 *:transition-colors *:duration-200">
          <button onClick={() => handleAddProductToWishlist({ id })}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button>
            <FontAwesomeIcon icon={faCodeCompare} />
          </button>
          <button>
            <Link to={`/products/${id}`}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </button>
        </div>

        {priceAfterDiscount && (
          <span className="badge absolute top-4 left-4 rounded-md bg-red-500 px-2 py-1 text-white">
            -{calcDiscount({ price, priceAfterDiscount })}%
          </span>
        )}
      </div>
    </>
  );
}
