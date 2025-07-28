import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../../index.css';
import feedbackBg from '../../assets/79e26d75-ee8a-4364-b53b-1fd6d687ae2c.jpg';

const FeedbackForm = () => {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Rating: ${rating}, Comment: ${comment}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div
        className="flex-1 flex"
        style={{
          backgroundImage: `url(${feedbackBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        
      >
        <div className="bg-white/30 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 flex flex-col justify-center" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', marginLeft: '50px', height: '70vh', width: '35rem', alignSelf: 'center'}}>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Rate your experience</h2>
          <p className="text-white text-center mb-6">
            We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.
          </p>
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => handleRating(star)}
                className={`w-8 h-8 cursor-pointer ${rating >= star ? 'text-yellow-400 animate-shine' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.417 8.285L12 18.839l-7.416 3.437 1.417-8.285-6.001-5.822 8.332-1.151z" />
              </svg>
            ))}
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about your experience!"
            value={comment}
            onChange={handleCommentChange}
            rows="4"
          />
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackForm;