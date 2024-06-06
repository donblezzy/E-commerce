import express from "express"
import { getProductDetails, 
    getProducts, 
    newProduct, 
    updateProduct, 
    deleteProduct, createProductReview, getProductReview, deleteProductReview, 
    canUserReview,
    getAdminProducts} from "../controllers/productControllers.js"
import { isAuthenticated, authorizeRoles } from "../middlewares/protect.js"

const router = express.Router()

router.route("/products").get(getProducts)
router.route("/admin/products").post(isAuthenticated, authorizeRoles("admin"), newProduct)
router.route("/admin/products").get(isAuthenticated, authorizeRoles("admin"), getAdminProducts)

router.route("/products/:id").get(getProductDetails)
router.route("/admin/products/:id").put(isAuthenticated, authorizeRoles("admin"), updateProduct)
router.route("/admin/products/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)

router.route("/reviews").get(isAuthenticated, getProductReview)
router.route("/reviews").put(isAuthenticated, createProductReview)
router.route("/admin/reviews").delete(isAuthenticated, authorizeRoles("admin"),  deleteProductReview)
router.route("/can_review").get(isAuthenticated, canUserReview)


export default router