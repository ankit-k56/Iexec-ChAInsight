import { factory } from "../utils/Iexecfactory.mjs";
import { genAI } from "../utils/Aiprovider.mjs";
import "dotenv/config";

export const getUsElectionResult = async (req, res) => {
  try {
    const newsData = await factory.readOracle(process.env.USA, {
      dataType: "string",
    });
    console.log(newsData);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Out of all the candidates competing in US 2024 elections. which candiadte have what percentage of chances of winning the upcoming elections in USA? Also here is a recent news headline: ${newsData.value} use this data and you knowledge as well for prediction, Just return Candiadte names and their winning percentage in string seperated by comma and try to keep it as less in bytes as possible like remove white spaces and don't add percentage signs or newline characters just use comma to seperate candiadtes and : to candidate from their percentage example Biden:40,Trumph:20. Return data for for all the candidates out of 100`;
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
