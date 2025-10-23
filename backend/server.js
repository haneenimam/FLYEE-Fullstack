import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flightsPath = path.join(__dirname, "data", "flights.json");
let flights = [];

try {
  if (fs.existsSync(flightsPath)) {
    const raw = fs.readFileSync(flightsPath, "utf8");
    flights = JSON.parse(raw);
    console.log(`Loaded ${flights.length} flights from data/flights.json`);
  } else {
    console.error("flights.json not found at:", flightsPath);
  }
} catch (err) {
  console.error("Error reading flights.json:", err.message);
  flights = [];
}

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API running", time: new Date().toISOString() });
});

app.get("/api/flights", (req, res) => {
  try {
    const {
      from,
      to,
      fromCountry,
      toCountry,
      date,
      q,
      minPrice,
      maxPrice,
      limit,
    } = req.query;

    let results = [...flights];
    const origin = fromCountry || from;
    const destination = toCountry || to;

    if (origin)
      results = results.filter(
        (f) =>
          f.fromCountry?.toLowerCase().includes(origin.toLowerCase()) ||
          f.from?.toLowerCase().includes(origin.toLowerCase())
      );

    if (destination)
      results = results.filter(
        (f) =>
          f.toCountry?.toLowerCase().includes(destination.toLowerCase()) ||
          f.to?.toLowerCase().includes(destination.toLowerCase())
      );

    if (date) results = results.filter((f) => f.date === String(date));
    if (minPrice) results = results.filter((f) => f.price >= Number(minPrice));
    if (maxPrice) results = results.filter((f) => f.price <= Number(maxPrice));

    if (q) {
      const qLower = q.toLowerCase();
      results = results.filter(
        (f) =>
          f.airline.toLowerCase().includes(qLower) ||
          f.flightNumber.toLowerCase().includes(qLower) ||
          f.from.toLowerCase().includes(qLower) ||
          f.to.toLowerCase().includes(qLower)
      );
    }

    const limited = limit ? results.slice(0, Number(limit)) : results;
    res.json({ success: true, data: limited, count: limited.length });
  } catch (error) {
    console.error("GET /api/flights error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch flights", error: error.message });
  }
});

app.get("/api/flights/:id", (req, res) => {
  try {
    const flight =
      flights.find((f) => f.id === req.params.id || f.flightNumber === req.params.id) || null;
    if (!flight) return res.status(404).json({ success: false, message: "Flight not found" });
    res.json({ success: true, data: flight });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch flight", error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
