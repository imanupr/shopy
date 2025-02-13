const express = require("express");
const { addProduct, getProducts, deleteProduct } = require("../controllers/productController");
const { protect, admin } = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadmiddleware");

const router = express.Router();

router.post("/", upload.single("image"),protect, admin, addProduct);
//here protect ,admin ensures login cheyth token kittiyal only can add product and also making mandatory that role should be admin
router.get("/", getProducts);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;