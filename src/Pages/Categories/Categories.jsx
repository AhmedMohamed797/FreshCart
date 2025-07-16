import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/category.service";
import Loading from "../../Components/Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await getAllCategories();
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-3 text-3xl font-bold text-gray-800">
          Shop by Category
        </h2>
        <div className="bg-primary-500 mx-auto h-1 w-24 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group h-[300px] transform cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
              <div className="relative h-full">
                <div className="h-full">
                  <img
                    src={category.image}
                    className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={category.name}
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-black/20 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="translate-y-4 text-center transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="mb-2 px-4 text-xl font-bold text-white">
                      {category.name}
                    </h3>
                    <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                      Browse Collection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
