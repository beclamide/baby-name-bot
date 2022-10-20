import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.sex, req.body.animal),
    temperature: 0.7,
    max_tokens: 128
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(sex, animal) {
  const capitalizedSex =
    sex[0].toUpperCase() + sex.slice(1).toLowerCase();

  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  return `Suggest three names for a ${capitalizedSex} baby ${capitalizedAnimal}`;
}
