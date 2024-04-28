import { factory } from "../utils/Iexecfactory.mjs";
import { genAI } from "../utils/Aiprovider.mjs";
import "dotenv/config";

export const getEthData = async (req, res) => {
  try {
    const newsData = await factory.readOracle(process.env.ETH, {
      dataType: "string",
    });
    console.log(newsData);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Predict will the ethereum price go up or down in the next 24 hours? Also here is a recent news headline: ${newsData.value} use this data and your knowledge as well for prediction, Just return bullish for up or bearish for down.`;
    const result = await model.generateContent(prompt);
    // console.log(result);
    const response = await result.response;
    const text = response.text();

    console.log(text);

    return res.status(200).json({ text });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
