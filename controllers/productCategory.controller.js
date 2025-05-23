const e = require("express");
const ProductCategory = require("../models/productCategory.model");

//Tạo mới danh mục sản phẩm
exports.createProductCategory = async (req, res, next) => {
  try {
    const {name} = req.body;
    // Tên danh mục không được bỏ trống
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Tên danh mục không được bỏ trống" });
    }

    // Kiểm tra xem danh mục đã tồn tại chưa
    const existedCategory = await ProductCategory.getAllProductCategories();
    if (existedCategory.some((category) => category.name === name)) {
      return res.status(400).json({ message: "Tên danh mục đã tồn tại" });
    }

    // Nếu phù hợp 2 tiêu chí trên thì tạo mới danh mục
    const id = await ProductCategory.createProductCategory(req.body);
    res.status(201).json({
      message: "Product category created successfully",
      id: id,
    });
  } catch (error) {
    next(error);
  }
};

//Lấy danh sách danh mục sản phẩm
exports.getAllProductCategories = async (req, res, next) => {
  try {
    const ProductCategories = await ProductCategory.getAllProductCategories();
    res.status(200).json(ProductCategories);
  } catch (error) {
    next(error);
  }
};

//Lấy danh mục sản phẩm theo id
exports.getProductCategoryById = async (req, res, next) => {
  try {
    const ProductCategory = await ProductCategory.getProductCategoryById(
      req.params.id
    );
    if (!ProductCategory) {
      return res.status(404).json({ message: "Product category not found" });
    }
    res.status(200).json(ProductCategory);
  } catch (error) {
    next(error);
  }
};

//Cập nhật danh mục sản phẩm theo id
exports.updateProductCategory = async (req, res, next) => {
  try {
    const {name} = req.body;
    // Tên danh mục không được bỏ trống
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Tên danh mục không được bỏ trống" });
    }

    // Kiểm tra xem danh mục đã tồn tại chưa
    const existedCategory = await ProductCategory.getAllProductCategories();
    if (existedCategory.some((category) => category.name === name && category.id != req.params.id)) {
      return res.status(400).json({ message: "Tên danh mục đã tồn tại" });
    }
    // Nếu phù hợp 2 tiêu chí trên thì cập nhật danh mục
    const updated = await ProductCategory.updateProductCategory(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res.status(404).json({ message: "Product category not found" });
    }
    res.status(200).json({ message: "Product category updated successfully" });
  } catch (error) {
    next(error);
  }
};

//Xóa danh mục sản phẩm theo id
exports.deleteProductCategory = async (req, res, next) => {
  try {
    const deleted = await ProductCategory.deleteProductCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product category not found" });
    }
    res.status(200).json({ message: "Product category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
