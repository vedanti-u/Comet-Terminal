import { OpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();

async function askLLM() {
  const model = new OpenAI({});
  const res = await model.invoke(
    "Create a Linux command to find pid of port 3000, then provide the command without any additional explanation or unnecessary characters"
  );
  console.log(JSON.stringify(res));
}

(async () => {
  await askLLM();
  console.log("Asked LLM");
})();

//, just give me command remove extra spaces and newline characters
