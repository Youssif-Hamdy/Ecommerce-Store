import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import "animate.css"; 
import Footer from "../components/Footer";

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  const [showLandingPage, setShowLandingPage] = useState(true); 
  const [liked, setLiked] = useState<any>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: any) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success(`${product.title} has been added to your cart!`);
  };

  const addToFavorites = (product: any) => {
    let favoriteItems = JSON.parse(localStorage.getItem("favoriteItems") || "[]");
  
    if (liked[product.id]) {
      favoriteItems = favoriteItems.filter((item: any) => item.id !== product.id);
      toast.info(`${product.title} has been removed from your favorites!`);
    } else {
      favoriteItems.push(product);
      toast.success(`${product.title} has been added to your favorites!`);
    }
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    toggleHeart(product.id);
  };

  const filteredProducts = products.filter(product => 
    product.category.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const toggleHeart = (productId: number) => {
    setLiked((prevLiked: any[]) => ({
      ...prevLiked,
      [productId]: !prevLiked[productId], 
    }));
  };


  return (
    <div className="relative bg-gray-100 min-h-screen text-gray-800">
      <ToastContainer />

      {showLandingPage ? (
        <section className="relative flex flex-col md:flex-row items-center justify-center py-16 px-4 md:px-12">
          <div className="absolute inset-0 bg-white opacity-40"></div>
          <div className="relative z-10 w-full md:w-1/2 p-6 mb-6 md:mb-0 text-center md:text-left animate__animated animate__fadeInLeftBig">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 animate__animated animate__fadeIn">
            Welcome to Our E-Commerce Store
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold text-black mb-4 animate__animated animate__fadeIn">
              Your one-stop shop for everything!
            </h2>
            <p className="text-base md:text-lg text-black mb-6 animate__animated animate__fadeIn">
              Discover the best products at unbeatable prices. Shop now and enjoy amazing deals!
            </p>

            <div className="flex justify-center md:justify-start space-x-4">
              <button
                className="bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 animate__animated animate__fadeIn"
                onClick={() => setShowLandingPage(false)} 
              >
                Shop Now
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 animate__animated animate__zoomIn">
            <img
              src="https://plus.unsplash.com/premium_photo-1661658231614-cdc9cfb56e29?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Banner"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="relative z-10 w-full md:w-1/2 p-6 mt-8 text-center animate__animated animate__fadeInUp">
            <h2 className="text-3xl font-semibold text-black mb-4">Why Choose Us?</h2>
            <p className="text-lg text-black mb-4">
              We offer a wide variety of products, excellent customer service, and fast shipping!
            </p>
            <ul className="text-left text-black mx-auto max-w-lg">
              <li className="mb-2">✅ Best Price Guarantee</li>
              <li className="mb-2">✅ Quality Assurance</li>
              <li className="mb-2">✅ Easy Returns</li>
              <li className="mb-2">✅ 24/7 Customer Support</li>
            </ul>
          </div>
        </section>
      ) : (
        <section className="max-w-6xl mx-auto py-12 px-4 md:px-6">
          <div className="text-center mb-8">
            {loading && <p className="text-gray-600">Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <select
              className="mb-4 p-2 mt-4 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg flex flex-col p-6 transition-transform duration-300 transform hover:scale-105 animate__animated animate__fadeInUp"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="mb-2 text-gray-700">
                  {product.description.substring(0, 100)}...
                </p>
                <div className="flex-grow" />
                <p className="text-lg font-bold text-blue-600 mb-4">${product.price}</p>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-black text-white flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                    onClick={() => addToCart(product)}
                  >
                    <FaCartPlus className="mr-2" />
                    Add to Cart
                  </button>
                  <div
                            className="text-red-600 cursor-pointer hover:text-red-800 transition duration-300"
                            onClick={() => addToFavorites(product)} 
                          >
                            <FaHeart
                              className="text-2xl transition duration-300"
                              style={{ color: liked[product.id] ? "red" : "gray" }} 
                            />
                          </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              onClick={() => setShowLandingPage(true)}
            >
              Back to home Page
            </button>
          </div>
        </section>
      )}
      <Footer/>
    </div>
  );
};

export default HomePage;
