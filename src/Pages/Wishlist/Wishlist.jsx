import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowLeft,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import WishlistItem from "../../Components/WishlistItem/WishlistItem";
import { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/Wishlist.context";
import Loading from "../../Components/Loading/Loading";

export default function Wishlist() {
  const { wishlistInfo, isLoading, refreshWishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    refreshWishlist();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const { count, data } = wishlistInfo;

  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Section - Wishlist Items */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white p-4 shadow-md">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="h-5 w-5 text-red-600"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  My Wishlist
                </h1>
                <p className="mt-0.5 text-sm text-gray-600">
                  {count ?? 0} items in your wishlist
                </p>
              </div>
            </div>

            {/* Wishlist Items List */}
            <div className="space-y-4">
              {data.length > 0 ? (
                data.map((item) => (
                  <WishlistItem key={item.id} productInfo={item} />
                ))
              ) : (
                <div>Your Wishlist Is Empty </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Features Card */}
            <div className="rounded-xl bg-white p-5 shadow-md">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Why Use Wishlist?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-red-100">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="h-4 w-4 text-red-600"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Save for Later
                    </h4>
                    <p className="text-xs text-gray-600">
                      Keep track of products you love
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="h-4 w-4 text-blue-600"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Quick Add to Cart
                    </h4>
                    <p className="text-xs text-gray-600">
                      Move items to cart when ready to buy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-green-100">
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="h-4 w-4 text-green-600"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Easy Access
                    </h4>
                    <p className="text-xs text-gray-600">
                      Find your saved items anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
