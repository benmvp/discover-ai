import OpenAI from 'openai'
import { getMatchingSkus } from './products'

interface ChatParams {
  messages: OpenAI.ChatCompletionMessageParam[]
}

export const chat = async ({ messages }: ChatParams) => {
  console.log({ messages })
  // Create an OpenAI instance (with the API key)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const runner = await client.beta.chat.completions
    .runFunctions({
      model: 'gpt-3.5-turbo-1106',
      // stream: true,
      messages: [
        {
          role: 'system',
          content: `You are a professional personal shopper in the tone of a friend that wants to find the best products for your client given their needs. Summarize at the end why you have chosen the suggested products. Ask if there is further preferences for their search.\n\nReturn the SKUs as a bulleted list.`,
        },
        {
          role: 'assistant',
          content:
            "Hello! 👋 I am your personal shopper that will help you find the perfect clothes that you are looking for. Tell me what you're looking for",
        },
        ...messages,
      ],
      functions: [
        {
          name: 'getMatchingSkus',
          description: 'Gets matching SKUs for products',
          function: getMatchingSkus,
          parse: JSON.parse, // TODO: use a better parser (like zod) for type safety
          parameters: {
            type: 'object',
            properties: {
              budget: {
                description:
                  'The maximum price they are willing to pay for a product',
                type: 'integer',
                minimum: 0,
                maximum: 50,
              },
              color: {
                description:
                  'The color of the product they are looking for (e.g "black", "multicolor", "plaid", etc.)',
                type: 'string',
              },
              length: {
                description:
                  'The length of the product they are looking for (e.g "mini", "midi", "maxi", "short", "regular", "long", etc.)',
                type: 'string',
              },
              material: {
                description:
                  'The material of the product they are looking for (e.g "polyester", "cotton", "spandex", "denim", etc.)',
                type: 'string',
              },
              pattern: {
                description:
                  'The pattern of the product they are looking for (e.g "solid", "plain", "floral", "striped", etc.)',
                type: 'string',
              },
              style: {
                description:
                  'The style of the product they are looking for (e.g "casual", "elegant", "sexy", "party", "sport", "boho", "high waist", etc.)',
                type: 'string',
              },
              type: {
                description:
                  'The type of the product they are looking for (e.g "dress", "shirt", "pants", "skirt", "shorts" etc.)',
                type: 'string',
              },
            },
          },
        },
      ],
    })
    .on('message', (message) => {
      console.log('response message', message)
    })

  const finalContent = await runner.finalContent()

  console.log(finalContent)
}
