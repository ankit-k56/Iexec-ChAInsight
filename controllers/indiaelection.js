import { factory } from "../utils/Iexecfactory.mjs";
import { genAI } from "../utils/Aiprovider.mjs";
import "dotenv/config";

export const getIndiaElectionResult = async (req, res) => {
  try {
    const newsData = await factory.readOracle(process.env.INDIA, {
      dataType: "string",
    });
    console.log(newsData);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Out if these parties BJP Bharatiya Janata Party ,BSP Bahujan Samaj Party ,CPI Communist Party of India ,CPM Communist Party of India (Marxist) ,INC Indian National Congress, NCP Nationalist Congress Party, AAP. which parties have ehat percentage of chances of winning the upcoming elections in India? Add the parties that are not mentioned here as well. Also here is a recent news headline: ${newsData.value} use this data and your knowledge as well for prediction, Just return Party names and their winning percentage in string seperated by comma and try to keep it as less in bytes as possible like remove white spaces and don't add percentage signs or newline characters just use comma to seperate parties and - to praty from their percentage example BJP:30,INC:10.`;
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
