import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Briefcase, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import '../../index.css';

const Header = ({ onSignupClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const location = useLocation();
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  
  const productsRef = useRef(null);
  const servicesRef = useRef(null);

  const solutionsLinks = [
    { href: 'https://jitglobalinfosystems.com/portfolio/cloud-infra-services/', text: 'Cloud Infrastructure' },
    { href: 'https://jitglobalinfosystems.com/portfolio/application-development-services/', text: 'App Development' },
    { href: 'https://jitglobalinfosystems.com/portfolio/data-engineering-services/', text: 'Data Engineering' },
    { href: 'https://jitglobalinfosystems.com/portfolio/cybersecurity-services/', text: 'Cybersecurity' },
    { href: 'https://jitglobalinfosystems.com/portfolio/testing-as-a-service-taas/', text: 'Testing as a Service' },
    { href: 'https://jitglobalinfosystems.com/portfolio/project-management-as-a-service-pmaas/', text: 'Project Management' },
    { href: 'https://jitglobalinfosystems.com/portfolio/sap-offerings/', text: 'SAP Solutions' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  const products = [
    { key: 'rms', label: 'RMS', path: '/solutions' },
    { key: 'rid', label: 'RID' },
    { key: 'ims', label: 'IMS' },
    { key: 'intellichat', label: 'IntelliChat' }
  ];

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [productModal, setProductModal] = useState('');

  // Dropdown animation variants
  const dropdownAnim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-[#181ed4] p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#181ed4]">
              RMS
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[#181ed4] hover:text-white transition-colors duration-300 font-medium relative group ${
                  isActive(item.path) ? 'text-white bg-[#181ed4] rounded px-2 py-1' : ''
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#181ed4] transition-all duration-300 group-hover:w-full ${
                  isActive(item.path) ? 'w-full' : ''
                }`} />
              </Link>
            ))}
            {/* Products Dropdown */}
            <div className="relative" ref={productsRef}>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Products
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    {...dropdownAnim}
                    className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 border border-slate-200"
                  >
                    {products.map((product) => (
                      product.path ? (
                        <Link
                          key={product.key}
                          to={product.path}
                          className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          {product.label}
                        </Link>
                      ) : (
                        <button
                          key={product.key}
                          className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                          onClick={() => { setIsProductsOpen(false); setProductModal(product.label); }}
                        >
                          {product.label}
                        </button>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                className="flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Services
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isSolutionsOpen && (
                  <motion.div
                    {...dropdownAnim}
                    className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 border border-slate-200"
                  >
                    {solutionsLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        {link.text}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
          {/* Product Modal */}
          <AnimatePresence>
            {productModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={() => setProductModal('')}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-2"
                  style={{ pointerEvents: 'auto', minHeight: '100vh' }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="relative flex flex-col items-center justify-center w-full max-w-xs sm:max-w-md bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/30 overflow-auto">
                    <button
                      onClick={() => setProductModal('')}
                      className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition-colors text-2xl font-bold bg-white/70 rounded-full w-9 h-9 flex items-center justify-center shadow-md"
                      aria-label="Close"
                      style={{ lineHeight: 1 }}
                    >
                      ×
                    </button>
                    <div className="flex flex-col items-center justify-center mt-2 mb-4">
                      <div className="bg-blue-100 p-4 rounded-full mb-3 shadow-sm flex items-center justify-center">
                        <Clock className="h-8 w-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Coming Soon</h2>
                      <p className="text-base text-slate-700 text-center max-w-xs">
                        Our Developers are workheeeeeeeeeeeing on that.<br />Soon this product will be in Market.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center space-x-4">
            <button
              onClick={onSignupClick}
              className="hidden sm:inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium ${
                    isActive(item.path) ? 'text-blue-600' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t pt-3">
                {/* Products Dropdown (Mobile) */}
                <button
                  className="flex items-center w-full text-sm text-slate-500 mb-2 focus:outline-none"
                  onClick={() => setIsMobileProductsOpen((v) => !v)}
                  aria-expanded={isMobileProductsOpen}
                  aria-controls="mobile-products-dropdown"
                >
                  Products
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileProductsOpen && (
                  <div id="mobile-products-dropdown">
                    {products.map((product) => (
                      product.path ? (
                        <Link
                          key={product.key}
                          to={product.path}
                          onClick={() => { setIsMobileMenuOpen(false); setIsMobileProductsOpen(false); }}
                          className="block py-2 pl-4 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                        >
                          {product.label}
                        </Link>
                      ) : (
                        <button
                          key={product.key}
                          className="block w-full text-left py-2 pl-4 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                          onClick={() => { setIsMobileProductsOpen(false); setProductModal(product.label); }}
                        >
                          {product.label}
                        </button>
                      )
                    ))}
                  </div>
                )}
                {/* Services Dropdown (Mobile) */}
                <button
                  className="flex items-center w-full text-sm text-slate-500 mb-2 focus:outline-none"
                  onClick={() => setIsMobileServicesOpen((v) => !v)}
                  aria-expanded={isMobileServicesOpen}
                  aria-controls="mobile-services-dropdown"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileServicesOpen && (
                  <div id="mobile-services-dropdown">
                    {solutionsLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2 pl-4 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  onSignupClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;