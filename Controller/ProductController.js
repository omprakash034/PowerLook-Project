const mongoose = require("mongoose");

const product = require('../model/product');


exports.getWelcome = async (req, res) => {
  res.send("welcome to Product Collection" + "hey" + req.query.name);
};

exports.getProduct = async(req, res) => {
  const Product = await product.find();
  res.status(200).json({
    status : "sucess",
    message : "product fetch successfully",
    data : Product

  })
};

exports.getProductById = async(req,res) => {
  const { id } = req.params; 
  const Products = await product.findById(id);
  res.status(200).json({
    status : "sucess",
    message : "product fetch by ID successfully",
    data : Products
  })
};

exports.postProduct = async(req, res) => {
  try{
    const {productName,productPrize, productDescription, productDiscount,  productOfferPrice, productCreatedBy,  productCategories,  productSKU,  productCreatedDate,  productImage, productSizeAndStock, reviews, productCol, productColor} = req.body;
    
    if (
      !productName || 
      !productPrize ||
       !productDescription || 
       !productDiscount || 
       !productOfferPrice || 
       !productCreatedBy || 
       !productCategories || 
       !productSKU || 
       !productImage ||
       ! productCol
      ) {
      return res.status(400).json({ message: "This product data is not valid" });
    }
    const existingProduct = await product.findOne({ productName });
    if (existingProduct)
  return res.status(409).json({ message: "User already exists" });


    //if product is not found newProduct is created
    const newProduct = new product({productName,productPrize, productDescription, productDiscount,  productOfferPrice, productCreatedBy,  productCategories,  productSKU,  productCreatedDate,  productImage, productSizeAndStock, reviews, productCol, productColor});
   // await newProduct.save();
    //res.status(201).json({message: "user created successfully", product: newProduct});

    const sku =newProduct.productSKU;

    const savedProduct = await newProduct.save();
    const newCreatedProduct = savedProduct._id;
    const similarProduct = await product.find({productSKU: sku});

    if(!similarProduct.length){
      //const savedProduct = await newProduct.save();
      return res.status(200).json({message: "product created successfully", product: savedProduct})
    }
    else{
      const colorMap = new Map();
      similarProduct.forEach(product => {
        const color = product.productCol;
        const id = product._id;
        colorMap.set(color, id);
      });

      for(const [color, productId] of colorMap.entries()){
        const currProduct = await product.findById(productId);
        currProduct.productColor = Object.fromEntries(colorMap);

        await currProduct.save();
        console.log(currProduct.productColor);
      }
      newProduct.productColor = colorMap;
      //const savedProduct = await newProduct.save();

      return res.status(200).json({message:"product created successfully" ,product: savedProduct});
    }
    
}
catch(err){
console.error(err);
res.status(500).json({message: "internal server error"})
}
};




exports.putProduct = async(req, res) => {
try{
  const {id} = req.params;

  const {productName,productPrize, productDescription, productDiscount,  productOfferPrice, productCreatedBy,  productCategories,  productSKU,  productCreatedDate,  productImage, productSizeAndStock, reviews, productCol, productColor} = req.body;

  console.log(id, productName,productPrize, productDescription, productDiscount,  productOfferPrice, productCreatedBy,  productCategories,  productSKU,  productCreatedDate,  productImage, productSizeAndStock, reviews, productCol, productColor);

  const productUpdate = await product.findByIdAndUpdate(id,{productName,productPrize, productDescription, productDiscount,  productOfferPrice, productCreatedBy,  productCategories,  productSKU,  productCreatedDate,  productImage, productSizeAndStock, reviews, productCol, productColor});

  console.log(productUpdate.productName)
  if(!productUpdate)return res.status(404).json({message:"product not found"});
  await productUpdate.save();
  res.status(200).json({ message: "Product updated successfully!" });

} catch (err) {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
}
};

exports.deleteProduct = async(req, res) => {
  try{
const {id} = req.params;

if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(400).json({message: "invalid Product Id"});
}

const deleteProduct = await product.findByIdAndDelete(id);

if(!deleteProduct) return res.status(404).json({message: "product is not found"});
res.status(200).json({message:"user deleted successfully!", Product: deleteProduct});
 }
  catch(err){
console.error(err);
res.status(500).json({message: "internal server error"});
  }
};