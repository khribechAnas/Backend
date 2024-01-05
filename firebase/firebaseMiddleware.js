const multer = require("multer");
const { format } = require("date-fns");

const upload = multer({ storage: multer.memoryStorage() });

exports.handleFileUploads = async (req, res, next) => {
  await upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "File upload error" });
    }

    const { title } = req.body;
    const formattedDate = format(Date.now(), "yyyy-MM-dd'_'HH:mm");

    try {
      req.productDetails = { title, formattedDate };

      next();
    } catch (error) {
      console.error("Error processing files:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
