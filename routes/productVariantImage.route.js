const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadImage");
const productVariantImageController = require("../controllers/productVariantImage.controller");
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/verifyToken");
const db = require("../config/db");

router.get("/", productVariantImageController.getAllProductVariantImages);
router.get("/:id", productVariantImageController.getProductVariantImageById);
router.get(
  "/variant/:variantId",
  productVariantImageController.getImagesByVariantId
);

// Upload tạm thời chưa lưu vào database
router.post(
  "/upload-temp",
  verifyToken,
  isAdmin,
  upload.single("image"),
  (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.json({ imageUrl: req.file.path.replace(/\\/g, "/") });
  }
);
router.post("/batch", verifyToken, isAdmin, async (req, res) => {
  const { productVariantId, images, thumbnail } = req.body;
  if (!productVariantId || !images)
    return res.status(400).json({ message: "Thiếu dữ liệu" });
  try {
    for (const imageUrl of images) {
      await db.execute(
        "INSERT INTO product_variant_image (productVariantId, imageUrl, isThumbnail) VALUES (?, ?, ?)",
        [productVariantId, imageUrl, imageUrl === thumbnail]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Lỗi lưu ảnh biến thể:", err);
    res.status(500).json({ message: "Lỗi lưu ảnh biến thể" });
  }
});
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  productVariantImageController.createProductVariantImage
);

router.post(
  "/set-thumbnail",
  verifyToken,
  isAdmin,
  productVariantImageController.setThumbnailImage
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  productVariantImageController.updateProductVariantImage
);

router.delete(
  "/image/:id",
  verifyToken,
  isAdmin,
  productVariantImageController.deleteProductVariantImage
);

router.delete(
  "/variant/:id",
  verifyToken,
  isAdmin,
  productVariantImageController.deleteImageByVariantID
);

module.exports = router;
