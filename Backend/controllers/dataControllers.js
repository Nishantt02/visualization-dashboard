import Data from "../models/Schema.js";

const FILTER_FIELD_MAP = {
    "end-years": "end_year",
    "end-year": "end_year",
    endYears: "end_year",
    endYear: "end_year",
    end_year: "end_year",
    topics: "topic",
    sectors: "sector",
    regions: "region",
    pestles: "pestle",
    sources: "source",
    swot: "swot",
    countries: "country",

    city: "city"
};

const normalizeValues = (value) => {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [];
};

const buildFilterQuery = (reqQuery) => {
    const query = {};

    const candidateFields = {
        end_year: reqQuery.end_year ?? reqQuery.endYear ?? reqQuery.endYears,
        topic: reqQuery.topic,
        sector: reqQuery.sector,
        region: reqQuery.region,
        pestle: reqQuery.pestle,
        source: reqQuery.source,
        country: reqQuery.country,
        city: reqQuery.city ?? reqQuery.cities,
        swot: reqQuery.swot
    };

    Object.entries(candidateFields).forEach(([field, rawValue]) => {
        if (rawValue === undefined || rawValue === null || rawValue === "") {
            return;
        }

        const values = normalizeValues(rawValue);
        if (!values.length) {
            return;
        }

        query[field] = values.length === 1 ? values[0] : { $in: values };
    });

    return query;
};

// Get all data
export const getAllData = async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Filter API
export const filterData = async (req, res) => {
    try {
        const query = buildFilterQuery(req.query);
        const data = await Data.find(query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Dropdown Options
export const getFilterOptions = async (req, res) => {
    try {
        const topics = await Data.distinct("topic");
        const sectors = await Data.distinct("sector");
        const regions = await Data.distinct("region");
        const countries = await Data.distinct("country");
        const pestles = await Data.distinct("pestle");
        const sources = await Data.distinct("source");
        const swot = await Data.distinct("swot");
        const cities = await Data.distinct("city");
        const endYears = await Data.distinct("end_year");

        res.json({
            topics,
            sectors,
            regions,
            countries,
            cities,
            pestles,
            sources,
            swot,
            endYears
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getFilterFieldOptions = async (req, res) => {
    try {
        const field = req.params.field;
        const mongoField = FILTER_FIELD_MAP[field];

        if (!mongoField) {
            return res.status(400).json({ message: "Unsupported filter field" });
        }

        const values = await Data.distinct(mongoField);
        res.json(values.filter((value) => value !== undefined && value !== null && value !== ""));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Topic vs Intensity
export const topicChart = async (req, res) => {
    try {
        const result = await Data.aggregate([
            {
                $group: {
                    _id: "$topic",
                    averageIntensity: {
                        $avg: "$intensity"
                    }
                }
            },
            {
                $sort: {
                    averageIntensity: -1
                }
            }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};