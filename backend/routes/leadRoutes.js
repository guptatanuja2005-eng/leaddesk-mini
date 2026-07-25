const express = require("express");
const router = express.Router();

const Lead = require("../models/Lead");
const authMiddleware = require("../middleware/authMiddleware");

// =========================================
// Create Lead (Public)
// POST /api/leads
// =========================================
router.post("/", async (req, res) => {
  try {
    const { name, email, budget, message } = req.body;

    // Validation
    if (!name || !email || !budget || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      budget,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      lead,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================================
// Get All Leads (Protected)
// GET /api/leads
// GET /api/leads?search=tanuja
// =========================================
router.get("/", authMiddleware, async (req, res) => {
  try {

    const search = req.query.search || "";

    const leads = await Lead.find({
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================================
// Update Lead Status (Protected)
// PATCH /api/leads/:id
// =========================================
router.patch("/:id", authMiddleware, async (req, res) => {
  try {

    const { status } = req.body;

    if (!["New", "Contacted", "Closed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      lead,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;