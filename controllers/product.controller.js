const Product = require("../models/product.model");

// Tạo mới sản phẩm
exports.createProduct = async (req, res, next) => {
  try {
    const id = await Product.createProduct(req.body);
    res.status(201).json({
      message: "Product created successfully",
      id: id,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách sản phẩm
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm theo id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Cập nhật sản phẩm theo id
exports.updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Xóa sản phẩm theo id
exports.deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
