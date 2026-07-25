function Features() {
  const features = [
    {
      title: "Fast Lead Capture",
      desc: "Collect customer inquiries instantly.",
      icon: "⚡",
    },
    {
      title: "Secure Storage",
      desc: "Store all leads safely in MongoDB Atlas.",
      icon: "🔒",
    },
    {
      title: "Easy Management",
      desc: "Update lead status from the admin dashboard.",
      icon: "📊",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-slate-800 text-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose LeadDesk?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-700 p-8 rounded-xl text-center shadow-lg hover:scale-105 transition"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="text-2xl font-semibold mt-4">
                {feature.title}
              </h3>

              <p className="text-gray-300 mt-3">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;