import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className=" bg-gray-50">
      {/* Main Content */}
      <main className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Illustration */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-9xl font-bold text-green-100">4</div>
              <div className="rounded-full bg-green-100 p-8">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="h-16 w-16 text-green-600"
                />
              </div>
              <div className="text-9xl font-bold text-green-100">4</div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Oops! Page Not Found
          </h1>
          <p className="mb-2 text-xl text-gray-600">
            The page you're looking for seems to have gone shopping!
          </p>
          <p className="mb-12 text-gray-500">
            Don't worry, our fresh products are still available for you.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button className="flex items-center space-x-2 rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700">
              <Link to={"/"}>
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
