import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import { CategoriesContext } from "../../Context/Categories.context";

export default function HomeCategories() {
  const { categories, isLoading } = useContext(CategoriesContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-0">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link
              to={"/categories"}
              className="text-primary-600 hover:text-primary-700 flex items-center gap-3 transition-colors duration-200"
            >
              <span>View All Categories</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          <div className="grid gap-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {categories.map((category) => (
              <Link
                to={`/category/${category._id}`}
                key={category._id}
                className="card flex cursor-pointer flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
              >
                <img
                  src={category.image}
                  alt=""
                  className="size-14 rounded-full object-cover"
                />
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
