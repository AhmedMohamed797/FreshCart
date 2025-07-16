import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  async function fetchBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands",
      );
      setBrands(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error loading brands. Please try again later.");
      setLoading(false);
    }
  }

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">Our Brands</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {brands.map((brand) => (
          <div key={brand._id} className="group">
            <div className="flex h-full transform flex-col items-center justify-between rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <img
                  src={brand.image}
                  className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  alt={brand.name}
                />
              </div>
              <div className="mt-4 w-full text-center">
                <h3 className="hover:text-primary-600 text-lg font-semibold text-gray-800 transition-colors">
                  {brand.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
