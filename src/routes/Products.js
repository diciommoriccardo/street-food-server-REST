import Router from "express";
import mongoose from "mongoose";
import productsController from "../controllers/Products.controller.js";
import authMiddleware from "../middlewares/auth.js";
import uploadS3 from '../middlewares/upload.js';

const router = new Router();

router.use(authMiddleware)

router.post("/", uploadS3.single('prodImage'), (req, res) => {
    productsController.create({
        displayName: req.body.displayName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        imgUrl: req.file.location
    })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(err))
})

router.get("/:_id", (req, res) => {
    productsController.getById(req)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})

router.delete('/:_id', (req, res) => {
    productsController.delete(req.params._id)
    .then(data => {console.log(data); return res.status(204).json(data)})
    .catch(err => {console.log(err); return res.status(500).json(err)})
})

router.get("/", (req, res) => {
    productsController.getAll(req)
    .then(data => res.status(200).json(data))
    .catch(err => {console.log(err); return res.status(500).json(err)})
})

router.put("/", uploadS3.single('prodImage'), (req, res) => {
    console.log(req.body)
    productsController.updateOne({
        _id: req.body._id,
        displayName: req.body.displayName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        imgUrl: req.file ? req.file.location : req.body.imgUrl
    })
    .then(data => res.status(200).json(data))
    .catch(err => {console.log(err); return res.status(500).json(err)})
})

router.get("/category/:category", (req, res) => {
    productsController.getByCategory(req.params.category)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})

export default router;