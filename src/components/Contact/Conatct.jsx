import React from "react";

function ContactForm() {
  return (
    <div className="flex justify-center items-center  min-h-screen bg-white px-4 py-1 ">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold  text-neutral-700 mb-6">
          Contact Us
        </h2>
        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:ring-red-700 focus:outline-none focus:border-red-700"
              placeholder="Your Name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-red-700 focus:border-red-700"
              placeholder="Your Email"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-red-700 focus:border-red-700"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-700 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-800 focus:outline-none"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
