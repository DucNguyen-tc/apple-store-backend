const Product = require("../models/product.model");
const { getProductCategoryById } = require("../models/productCategory.model");

// Tạo mới sản phẩm
exports.createProduct = async (req, res, next) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const { Name, ProductCategory_Id } = req.body;

    if (!Name || !ProductCategory_Id) {
      return res
        .status(400)
        .json({ message: "Name and ProductCategory_Id are required" });
    }

    if ((await getProductCategoryById(ProductCategory_Id)) === undefined) {
      return res
        .status(400)
        .json({ message: "ProductCategory_Id does not exist" });
    }

    // Kiểm tra trùng tên trong cùng 1 danh mục
    const allProducts = await Product.getAllProducts();
    if (
      allProducts.some(
        (p) => p.Name === Name && p.ProductCategory_Id === ProductCategory_Id
      )
    ) {
      return res
        .status(400)
        .json({ message: "Product name already exists in this category" });
    }

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
    const { Name, ProductCategory_Id } = req.body;

    // Nếu bạn muốn bắt buộc phải có cả Name và ProductCategory_Id khi update:
    if (!Name || !ProductCategory_Id) {
      return res
        .status(400)
        .json({ message: "Name and ProductCategory_Id are required" });
    }

    // Kiểm tra trùng tên trong cùng 1 danh mục (ngoại trừ chính nó)
    const allProducts = await Product.getAllProducts();
    if (
      allProducts.some(
        (p) =>
          p.Name === Name &&
          p.ProductCategory_Id === ProductCategory_Id &&
          p.id !== Number(req.params.id)
      )
    ) {
      return res
        .status(400)
        .json({ message: "Product name already exists in this category" });
    }

    // Kiểm tra ProductCategory_Id có tồn tại không
    if ((await getProductCategoryById(ProductCategory_Id)) === undefined) {
      return res
        .status(400)
        .json({ message: "ProductCategory_Id does not exist" });
    }

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


exports.getProductByCategoryID = async (req, res, next) => {
  try {
    const products = await Product.getProductsByCategoryId(req.params.id);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}