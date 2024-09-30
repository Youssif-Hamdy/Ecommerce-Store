import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiShoppingCart, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  useLocation();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favoritesItems, setFavoritesItems] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [favoritesPage, setFavoritesPage] = useState(0);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false); 
  const itemsPerPage = 4;
  

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



 
  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCartItems);

    const storedFavoritesItems = JSON.parse(localStorage.getItem("favoriteItems") || "[]");
    setFavoritesItems(storedFavoritesItems);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeFavorite = (index: number) => {
    const updatedFavorites = favoritesItems.filter((_, i) => i !== index);
    setFavoritesItems(updatedFavorites);
    localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorites));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const totalCartPages = Math.ceil(cartItems.length / itemsPerPage);
  const totalFavoritesPages = Math.ceil(favoritesItems.length / itemsPerPage);
  
  const currentCartItems = cartItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const currentFavoritesItems = favoritesItems.slice(favoritesPage * itemsPerPage, (favoritesPage + 1) * itemsPerPage);

  const emptyImageUrl = "https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif"; 
  const validatePayment = () => {
    let valid = true;
    let message = "";

   // Validate card number
const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
if (!cardNumberRegex.test(cardNumber)) {
  message += "The card number is invalid. It must be in the format 1234 5678 9012 3456.\n";
  valid = false;
}

// Validate expiration date
const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
if (!expiryRegex.test(expiryDate)) {
  message += "The expiration date is invalid. It must be in the format MM/YY.\n";
  valid = false;
}

// Validate CVC
if (cvc.length !== 3 || isNaN(Number(cvc))) {
  message += "The CVC is invalid. It must consist of 3 digits.\n";
  valid = false;
}

if (!valid) {
  setErrorMessage(message);
}


    return valid;
  };

  const handleSubmitPayment = (event: React.FormEvent) => {
    event.preventDefault();
    if (validatePayment()) {
      console.log("done");
      toggleModal(); 
    }
  };
  

  return (
    <>
     <nav className="fixed top-0 z-50 w-full px-5 py-3 shadow-md rounded-b-lg bg-gradient-to-r bg-black">
        <div className="flex items-center justify-between">
          <div id="logo" className="text-2xl font-bold cursor-pointer text-white flex items-center space-x-2">
            <FiShoppingBag className="w-8 h-8" />
            <span>ShopEase</span>
          </div>
          <div className="flex items-center space-x-6">
            
            <button onClick={toggleSidebar} className="relative group transition-transform duration-300">
              <FiShoppingCart className="text-white w-8 h-8 hover:scale-110" />
              <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-600 text-white text-xs font-bold text-center rounded-full">
              {cartItems.length + favoritesItems.length}
              </span>
            </button>
            <button onClick={toggleHamburgerMenu} className="text-white w-8 h-8 hover:scale-110">
              {isHamburgerOpen ? <FiX /> : <FiMenu  className="text-white w-10 h-8 hover:scale-110" />} 
            </button>
          </div>
        </div>
      </nav>
      <div className={`fixed top-0 right-0 w-full h-full bg-black bg-opacity-75 text-white z-50 transform ${isHamburgerOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 
  ${isHamburgerOpen ? "flex items-center justify-center" : "hidden"} 
  md:flex md:items-start md:justify-start md:w-64 md:h-full`}>
  <div className="p-6 text-center md:text-left">
    <button 
      onClick={() => setIsHamburgerOpen(false)} 
      className="absolute top-4 right-4 text-2xl">
      &times; 
    </button>
    <ul className="space-y-9">
      <li><a href="/" className="text-lg hover:text-gray-400 hover:text-xl transition-all duration-200 px-2 py-1 rounded">Home</a></li>
      <li><a href="/" className="text-lg hover:text-gray-400 hover:text-xl transition-all duration-200 px-2 py-1 rounded">About Us</a></li>
      <li><a href="/" className="text-lg hover:text-gray-400 hover:text-xl transition-all duration-200 px-2 py-1 rounded">Settings</a></li>
      <li><a href="/" className="text-lg hover:text-gray-400 hover:text-xl transition-all duration-200 px-2 py-1 rounded">Contact Us</a></li>
      <li><a href="/" className="text-lg hover:text-gray-400 hover:text-xl transition-all duration-200 px-2 py-1 rounded">Feedback</a></li>
    </ul>

  </div>
</div>




      {/* Sidebar for cart and favorites */}
      <div className={`fixed top-0 right-0 w-full md:w-96 bg-white shadow-xl h-full z-50 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out`}>
        <div className="p-6 overflow-hidden">
          <h2 className="text-2xl font-bold text-black mb-4">Your Cart & Favorites</h2>
          <button className="text-red-600 font-semibold mb-4 hover:underline transition-all duration-300" onClick={toggleSidebar}>
            Close
          </button>

          {/* Buttons to toggle Cart and Favorites */}
          <div className="mb-4 flex justify-between">
            <button onClick={() => setShowCart(true)} className={`flex-1 py-3 mx-1 rounded-lg ${showCart ? "bg-black text-white" : "bg-gray-200 text-black"} transition-colors duration-300`}>
              Your Cart
            </button>
            <button onClick={() => setShowCart(false)} className={`flex-1 py-3 mx-1 rounded-lg ${!showCart ? "bg-black text-white" : "bg-gray-200 text-black"} transition-colors duration-300`}>
              Your Favorites
            </button>
          </div>

          {/* Cart Items */}
          {showCart ? (
            <>
              <h3 className="text-xl font-bold text-black mb-2">Cart Items</h3>
              <div className="mb-4">
                <ul className="space-y-4">
                  {currentCartItems.length > 0 ? (
                    currentCartItems.map((item, index) => (
                      <li key={index} className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4 rounded-md" />
                        <div className="flex flex-col flex-grow">
                          <span className="font-semibold text-black">{item.title}</span>
                          <span className="text-black font-bold">${item.price.toFixed(2)}</span>
                        </div>
                        <button onClick={() => removeItem(index + currentPage * itemsPerPage)} className="text-red-600 font-semibold hover:underline">
                          Remove
                        </button>
                      </li>
                    ))
                  ) : (
                    <div className="text-center">
                      <img src={emptyImageUrl} alt="No Items" className="w-80 h-80 mx-auto mb-4" />
                      <p className="text-gray-500">Your cart is empty.</p>
                    </div>
                  )}
                </ul>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-black">Total Price: ${totalPrice.toFixed(2)}</h3>
                <button onClick={toggleModal} className="ml-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-600 transition duration-300">
                  Buy Now
                </button>
              </div>
              {/* Pagination Controls for Cart */}
              <div className="flex justify-center mt-4">
                {[...Array(totalCartPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`py-2 px-4 mx-1 rounded-md ${currentPage === index ? "bg-black text-white" : "bg-gray-200 text-black"} transition-colors duration-300`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-black mb-2">Favorites Items</h3>
              <div className="mb-4">
                <ul className="space-y-4">
                  {currentFavoritesItems.length > 0 ? (
                    currentFavoritesItems.map((item, index) => (
                      <li key={index} className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4 rounded-md" />
                        <div className="flex flex-col flex-grow">
                          <span className="font-semibold text-black">{item.title}</span>
                          <span className="text-black font-bold">${item.price.toFixed(2)}</span>
                        </div>
                        <button onClick={() => removeFavorite(index + favoritesPage * itemsPerPage)} className="text-red-600 font-semibold hover:underline">
                          Remove
                        </button>
                      </li>
                    ))
                  ) : (
                    <div className="text-center">
                      <img src={emptyImageUrl} alt="No Items" className="w-80 h-80 mx-auto mb-4" />
                      <p className="text-gray-500">No favorites yet.</p>
                    </div>
                  )}
                </ul>
              </div>
              {/* Pagination Controls for Favorites */}
              <div className="flex justify-center mt-4">
                {[...Array(totalFavoritesPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setFavoritesPage(index)}
                    className={`py-2 px-4 mx-1 rounded-md ${favoritesPage === index ? "bg-black text-white" : "bg-gray-200 text-black"} transition-colors duration-300`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Payment Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md w-full ${errorMessage ? 'shake' : ''}`}>
    <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
      <svg className="w-6 h-6 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
        <path d="M15 10h-2V8c0-1.104-.896-2-2-2s-2 .896-2 2v2H9c-1.104 0-2 .896-2 2s.896 2 2 2h2v2c0 1.104.896 2 2 2s2-.896 2-2v-2h2c1.104 0 2-.896 2-2s-.896-2-2-2z" />
      </svg>
      Payment Information
    </h3>
      <form onSubmit={handleSubmitPayment}>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-black">Card Number</label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full pl-10"
              placeholder="1234 5678 9012 3456"
              required
            />
            <svg className="absolute left-3 top-3 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0H5C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5V5c0-2.762-2.238-5-5-5zM12 17.998c-4.41 0-7.998-3.588-7.998-7.998S7.591 2 12 2s7.998 3.588 7.998 7.998S16.41 17.998 12 17.998z" />
              <path d="M18.414 5.586l-2.829 2.828c-.39.39-.39 1.023 0 1.414l2.828 2.828c.391.391 1.023.391 1.414 0l2.829-2.828c.391-.391.391-1.023 0-1.414l-2.829-2.828c-.391-.391-1.023-.391-1.414 0zM10 12H6v-2h4v2zm0-4H6V6h4v2zm10 8H6v-2h14v2z" />
            </svg>
          </div>
          {errorMessage && errorMessage.includes("invalid. It must be in the format") && (
            <p className="text-red-600 text-sm">{errorMessage.split("\n")[0]}</p>
          )}
        </div>
        <div className="flex mb-4">
          <div className="flex-1 mr-2">
            <label htmlFor="expiryDate" className="block text-black">Expiry Date</label>
            <div className="relative">
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full pl-10"
                placeholder="MM/YY"
                required
              />
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 0H6C2.688 0 0 2.688 0 6v12c0 3.312 2.688 6 6 6h12c3.312 0 6-2.688 6-6V6c0-3.312-2.688-6-6-6zM20 18c0 2.209-1.791 4-4 4H8c-2.209 0-4-1.791-4-4V6c0-2.209 1.791-4 4-4h8c2.209 0 4 1.791 4 4v12zM8 4h8c.553 0 1 .447 1 1s-.447 1-1 1H8c-.553 0-1-.447-1-1s.447-1 1-1zm8 12H8c-.553 0-1-.447-1-1s.447-1 1-1h8c.553 0 1 .447 1 1s-.447 1-1 1z" />
              </svg>
            </div>
            {errorMessage && errorMessage.includes("invalid. It must be in the format") && (
              <p className="text-red-600 text-sm">{errorMessage.split("\n")[1]}</p>
            )}
          </div>
          <div className="flex-1 ml-2">
            <label htmlFor="cvc" className="block text-black">CVC</label>
            <div className="relative">
              <input
                type="text"
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full pl-10"
                placeholder="123"
                required
              />
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0H5C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5V5c0-2.762-2.238-5-5-5zM12 17.998c-4.41 0-7.998-3.588-7.998-7.998S7.591 2 12 2s7.998 3.588 7.998 7.998S16.41 17.998 12 17.998zM15 10h-2V8c0-1.104-.896-2-2-2s-2 .896-2 2v2H9c-1.104 0-2 .896-2 2s.896 2 2 2h2v2c0 1.104.896 2 2 2s2-.896 2-2v-2h2c1.104 0 2-.896 2-2s-.896-2-2-2z" />
              </svg>
            </div>
            {errorMessage && errorMessage.includes("invalid. It must consist of 3 digits") && (
              <p className="text-red-600 text-sm">{errorMessage.split("\n")[2]}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button 
            type="button" 
            className="w-full bg-red-500 text-white rounded-lg py-2 hover:bg-red-600 transition duration-300 mr-2"
            onClick={() => setIsModalOpen(false)}> 
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-full bg-black text-white rounded-lg py-2 hover:bg-gray-600 transition duration-300 ml-2">
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;