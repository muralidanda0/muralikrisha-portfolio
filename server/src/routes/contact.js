const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Contact Form:", { name, email, message });

  res.status(200).json({ success: true });
});

module.exports = router;