import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw, AlertCircle, Loader2, Search, X, Sun, Moon } from 'lucide-react';
import NewsCard from './components/NewsCard';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('general');
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme !== null) {
        return savedTheme === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark if we can't determine
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update localStorage and document class when darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Categories for news
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

  // GNews API configuration
  const API_KEY = '2becb17373ed0b0feb31c026c1ab9f81';
  const API_URL = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`;

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news. Please check your API key.');
      }
      
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const filteredArticles = articles.filter(article => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (article.title && article.title.toLowerCase().includes(searchLower)) ||
      (article.description && article.description.toLowerCase().includes(searchLower)) ||
      (article.content && article.content.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
            <Newspaper className="w-14 h-14 text-white drop-shadow-lg animate-float" />
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              News Feed
            </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 transition-colors duration-200"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-700" />
              )}
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-100 text-lg mb-6 font-light tracking-wide">
            Stay updated with the <span className={`${darkMode ? 'bg-gradient-to-r from-pink-200 to-purple-200' : 'bg-gradient-to-r from-pink-500 to-purple-500'} text-transparent bg-clip-text font-medium`}>latest headlines</span>
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat.id
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg shadow-purple-500/30 transform scale-105'
                    : 'bg-white/5 text-gray-700 dark:text-white/80 hover:bg-white/20 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-0.5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-10 py-3.5 border-2 border-transparent rounded-full leading-5 bg-white/90 dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:ring-offset-2 focus:ring-offset-white/50 dark:focus:ring-offset-purple-900/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={fetchNews}
            disabled={loading}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-3 rounded-full font-semibold 
                     hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/30
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Refresh News
          </button>
        </header>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-indigo-600 dark:text-white animate-spin mb-4" />
            <p className="text-gray-800 dark:text-white text-xl">Loading latest news...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-gradient-to-r from-red-500/90 to-pink-600/90 text-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto backdrop-blur-sm border border-red-300/20 animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Error Loading News</h3>
            </div>
            <p>{error}</p>
            <p className="mt-2 text-sm">
              Please check your internet connection and try again.
            </p>
          </div>
        )}

        {!loading && !error && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}

        {!loading && !error && filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <Newspaper className="w-20 h-20 text-white/50 mx-auto mb-4" />
            <p className="text-white text-xl">
              {searchTerm ? 'No matching articles found' : 'No articles found'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-purple-200 hover:text-white"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
<footer className="text-center py-6 text-white/60 text-sm mt-12">
  <p>Created with ❤️ by Javeriya Sikandar</p>
</footer>
    </div>
  );
}

export default App;