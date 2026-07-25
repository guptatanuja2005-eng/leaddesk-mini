import { useState } from "react";
import API from "../services/api";

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.budget ||
      !formData.message
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/leads", formData);

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        budget: "",
        message: "",
      });

    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Get a Free Consultation
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          className="w-full p-3 bg-slate-800 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-500"
        />

        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          style={inputStyle}
          className="w-full p-3 bg-slate-800 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-500"
        >
          <option value="">Select Budget</option>
          <option value="0-10k">0 - 10k</option>
          <option value="10k-50k">10k - 50k</option>
          <option value="50k-1L">50k - 1L</option>
          <option value="1L+">1L+</option>
        </select>

        <textarea
          name="message"
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          rows="5"
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </form>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2545eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default LeadForm;