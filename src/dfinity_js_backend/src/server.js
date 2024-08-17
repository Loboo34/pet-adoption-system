const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/pet-images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = `/uploads/pet-images/${req.file.filename}`;
  res.json({ imageUrl: filePath });
});

app.use("/uploads", express.static("uploads"));

app.listen(3001, () =>
  console.log("Image Upload Service running on port 3001")
);
