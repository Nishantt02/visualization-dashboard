import express from "express";

import {
    getAllData,
    filterData,
    getFilterOptions,
    getFilterFieldOptions,
    topicChart
} from '../controllers/dataControllers.js';

const router = express.Router();

router.get("/", getAllData);
router.get("/data", getAllData);

router.get("/filters", filterData);
router.get("/data/filters", filterData);
router.get("/options", getFilterOptions);
router.get("/filters/:field", getFilterFieldOptions);

router.get("/chart/topic", topicChart);

export default router;