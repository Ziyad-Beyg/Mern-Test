import { Router } from "express";
import {
  addCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controllers.js";
import { upload } from "../middlewares/Multer.middlerware.js";

const router = Router();

router
  .route("/add-customer")
  .post(upload.fields([{ name: "profilePicture", maxCount: 1 }]), addCustomer);

router.route("/get-all-customers/:filter").get(getAllCustomers);

router
  .route("/update-customer/:id")
  .put(
    upload.fields([{ name: "profilePicture", maxCount: 1 }]),
    updateCustomer
  );

router.route("/delete-customer/:id").put(deleteCustomer);

export default router;
