function Hero() {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Capture More Leads.
            <br />
            Grow Your Business Faster.
          </h1>

          <p className="text-gray-300 text-lg mt-6">
            LeadDesk Mini helps businesses collect customer inquiries,
            organize leads, and track them efficiently from one dashboard.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#contact"
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </a>

            <a
              href="#features"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700"
            alt="Dashboard"
            className="rounded-xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;