import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faShoppingCart,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { calcDiscount } from "../../utils/discount.utils";
import Rating from "../Rating/Rating";
import { Link } from "react-router";
import { useContext } from "react";
import { WishlistContext } from "../../Context/Wishlist.context";

export default function WishlistItem({ productInfo }) {
  const {
    id,
    category,
    ratingsAverage,
    ratingsQuantity,
    price,
    title,
    priceAfterDiscount,
    imageCover,
  } = productInfo;

  const { handleRemoveWishlistItem } = useContext(WishlistContext);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md sm:flex-row">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link to={`/products/${id}`} className="block">
          <img
            src={imageCover}
            alt={title}
            className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          {/* Category and Title */}
          <div>
            <span className="text-sm text-gray-500">
              {category?.name ?? ""}
            </span>
            <h3 className="font-medium text-gray-900">
              <Link to={`/products/${id}`} className="hover:text-primary-600">
                {title}
              </Link>
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Rating rating={ratingsAverage} />
            <div className="text-sm text-gray-600">
              <span>{ratingsAverage}</span>
              <span className="ml-1">({ratingsQuantity})</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-primary-600 text-lg font-semibold">
              {priceAfterDiscount ? priceAfterDiscount : price} EGP
            </span>
            {priceAfterDiscount && (
              <>
                <del className="text-sm text-gray-500">{price} EGP</del>
                <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                  -{calcDiscount({ price, priceAfterDiscount })}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            type="button"
            disabled
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Add to Cart
          </button>

          <Link
            to={`/products/${id}`}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faEye} />
            View Details
          </Link>

          <button
            onClick={() => handleRemoveWishlistItem({ id })}
            className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            type="button"
          >
            <FontAwesomeIcon icon={faTrash} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
