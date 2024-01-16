# Shopping AI

A proof-of-concept GPT-powered AI chatbot that helps you find the best clothing using conversation. It uses the [Open AI API](https://platform.openai.com/) and a dataset of 25,000 clothing items from [Shein](https://www.shein.com/).

## Getting Started

After cloning the repository, install the dependencies with [pnpm](https://pnpm.io/):

```bash
pnpm install
```

Add a `.env.local` file with your [OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key):

```env
OPENAI_API_KEY='sk-...'
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000/shein](http://localhost:3000/sehin) with your browser to see the result.
