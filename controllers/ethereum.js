import { factory } from "../utils/Iexecfactory.mjs";
import { genAI } from "../utils/Aiprovider.mjs";

export const getEthData = async (req, res) => {
  try {
    const newsData = await factory.readOracle(
      "0x07c96ff3d6e18d8b3424060ad3cabc90ccc0cb77bac9cfc66db57ecb66fee70f",
      { dataType: "string" }
    );
    console.log(newsData);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Predict will the ethereum price go up or down in the next 24 hours? Also here is a recent news headline: ${newsData.value} use this data and your knowledge as well for prediction, Just return bullish for up or bearish for down.`;
    const result = await model.generateContent(prompt);
    // console.log(result);
    const response = await result.response;
    const text = response.text();

    console.log(text);

    res.status(200).json({ text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
