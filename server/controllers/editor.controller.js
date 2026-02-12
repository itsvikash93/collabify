const Document = require("../models/document.model");

// GET single document
module.exports.getDocument = async (req, res) => {
  try {
    const doc = await Document.findOne({ docId: req.params.id });

    if (!doc) {
      const newDoc = await Document.create({
        docId: req.params.id,
        content: "",
      });
      return res.json(newDoc);
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// UPDATE document content
module.exports.updateDocument = async (req, res) => {
  try {
    const { content } = req.body;

    const updated = await Document.findOneAndUpdate(
      { docId: req.params.id },
      { content },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};
