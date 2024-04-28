import { factory } from "../utils/Iexecfactory.mjs";
import { genAI } from "../utils/Aiprovider.mjs";
import "dotenv/config";
// const Redis = require("ioredis");
import { Redis } from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

export const getEthData = async (req, res) => {
  try {
    const val = await redis.get("eth");
    if (val) {
      return res.status(200).json({ text: val });
    }
    const newsData = await factory.readOracle(process.env.ETH, {
      dataType: "string",
    });
    console.log(newsData);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Predict will the ethereum price go up or down in the next 24 hours? Also here is a recent news headline: ${newsData.value} use this data and your knowledge as well for prediction, Also tell on the scale of 1 to 100 what is its chances of going up or down. Return value above 50 if it is going up and below 50 if it is going down. Example 60 or 40. Just return the number`;
    const result = await model.generateContent(prompt);
    // console.log(result);
    const response = await result.response;
    const text = response.text();

    console.log(text);
    await redis.set("eth", text);

    return res.status(200).json({ text });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
