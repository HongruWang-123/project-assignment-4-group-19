const Product = require('../models/productModel.js');

const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find(); // Fetch products from the database
        res.status(200).json(products); // Return as JSON
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
//    const { search, category } = req.query;
//     const query = {};

//     // Add search filter
//     if (search) {
//         query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
//     }

//     // Add category filter
//     if (category) {
//         query.category = category;
//     }

//     try {
//         const products = await Product.find(query);
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
}

const deleteProducts = async (req,res) => {
     try {
        const result = await Product.deleteMany(); 
        res.json({
            message: `All products removed successfully`,
            deletedCount: result.deletedCount, // Number of deleted documents
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const createProducts = async (req,res) => {
  const products = req.body; // Expecting an array of product objects
    try {
        if (!Array.isArray(products)) {
            return res.status(400).json({ message: "Invalid input: Expected an array of products" });
        }

        const createdProducts = await Product.insertMany(products); // Efficiently inserts multiple documents
        res.status(201).json({
            message: "Products created successfully",
            products: createdProducts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// const getProductById = async (req,res) => {
//      try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// }

const createProduct = async (req,res) => {
  const productData = req.body; // Expecting a single product object
  try {
    // Validate the request body
    if (!productData || typeof productData !== 'object') {
      return res.status(400).json({ message: "Invalid input: Expected a product object" });
    }

    // Create a new product document
    const newProduct = new Product(productData);
    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with the created product
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const updateProduct = async (req, res) => {
  const { model } = req.params; // Extract the model from the route
  const {category, specification, price, Image, review, stock, rate } = req.body;

  try {
    // Find the product by its model
    const product = await Product.findOne({ model });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }


    // Update fields if provided in the request body
    product.model = model || product.model;
    product.category = category || product.category;
    product.specification = specification || product.specification;
    product.price = price || product.price;
    product.Image = Image || product.Image;
    product.review = review || product.review;
    product.stock = stock || product.stock;
    product.rate = rate || product.rate;

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteOne({ model: req.params.model }); // Deletes the matching document
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product removed successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



module.exports = {getAllProducts,createProduct,createProducts,updateProduct,deleteProduct,deleteProducts}