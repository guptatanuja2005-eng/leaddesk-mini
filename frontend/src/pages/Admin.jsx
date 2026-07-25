import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Admin() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const res = await API.get(`/leads?search=${search}`);
      setLeads(res.data.leads || []);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // Check Login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchLeads();
  }, [search, navigate]);

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const total = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;
  const closed = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          LeadDesk Admin Dashboard
        </h1>

        <button
          onClick={logout}
         className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl font-semibold transition"
        >
          Logout
        </button>

      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <Card
          title="Total Leads"
          value={total}
          color="bg-blue-600"
        />

        <Card
          title="New"
          value={newLeads}
          color="bg-green-600"
        />

        <Card
          title="Contacted"
          value={contacted}
          color="bg-yellow-500"
        />

        <Card
          title="Closed"
          value={closed}
          color="bg-red-600"
        />

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search by Name or Email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-800 text-white placeholder-gray-400 border border-slate-600 rounded-xl px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-800 rounded-lg overflow-hidden">

          <thead className="bg-blue-600">

            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Budget</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-slate-700 hover:bg-slate-700"
                >
                  <td className="p-4">{lead.name}</td>

                  <td>{lead.email}</td>

                  <td>{lead.budget}</td>

                  <td>{lead.message}</td>

                  <td>

                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(lead._id, e.target.value)
                      }
                      className="text-black rounded px-2 py-1"
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Closed</option>
                    </select>

                  </td>

                  <td>
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6"
                >
                  No Leads Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color} rounded-xl p-6 shadow-lg`}>
      <h2 className="text-lg">{title}</h2>

      <h1 className="text-4xl font-bold mt-3">{value}</h1>
    </div>
  );
}

export default Admin;