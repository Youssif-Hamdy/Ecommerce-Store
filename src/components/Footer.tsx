export default function Footer() {
  return (
    <div className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-2 animate__animated animate__fadeInLeft">Shop With Us</h2>
            <p className="text-sm animate__animated animate__fadeInLeft animate__delay-1s">Copyright &copy; {new Date().getFullYear()} All rights reserved.</p>
            <p className="text-sm mt-2 animate__animated animate__fadeInLeft animate__delay-1.5s">"Your one-stop shop for all your needs!"</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <a href="/" className="text-white hover:text-gray-400 transition duration-300 text-lg animate__animated animate__fadeInUp animate__delay-2s">Home</a>
            <a href="/products" className="text-white hover:text-gray-400 transition duration-300 text-lg animate__animated animate__fadeInUp animate__delay-2.5s">Products</a>
            <a href="/about" className="text-white hover:text-gray-400 transition duration-300 text-lg animate__animated animate__fadeInUp animate__delay-3s">About Us</a>
            <a href="/contact" className="text-white hover:text-gray-400 transition duration-300 text-lg animate__animated animate__fadeInUp animate__delay-3.5s">Contact Us</a>
            <a href="/privacy" className="text-white hover:text-gray-400 transition duration-300 text-lg animate__animated animate__fadeInUp animate__delay-4s">Privacy Policy</a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-2 animate__animated animate__fadeInUp animate__delay-4.5s">Follow Us on Social Media</h3>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-white hover:text-gray-400 transition duration-300">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300">
              <i className="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm animate__animated animate__fadeInUp animate__delay-5s">Join our newsletter for exclusive offers and updates on new arrivals!</p>
        </div>
      </div>
    </div>
  );
}
