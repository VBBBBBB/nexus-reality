import express from "express";
import Property from "../models/Property.js";

const router = express.Router();

router.get("/update-ids", async (req, res) => {
    try {
        const properties = await Property.find({ customId: { $exists: false } }).sort({ createdAt: 1 });
        const updates = [];
        const dateCounters = {};

        for (const property of properties) {
            const date = new Date(property.createdAt);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            const dateString = `${day}${month}${year}`;

            if (!dateCounters[dateString]) {
                dateCounters[dateString] = 1;
            }

            const sequence = String(dateCounters[dateString]).padStart(2, "0");
            const customId = `${dateString}${sequence}`;

            property.customId = customId;
            updates.push(property.save());
            dateCounters[dateString]++;
        }

        await Promise.all(updates);
        res.json({ message: `Updated ${updates.length} properties`, updates: dateCounters });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
