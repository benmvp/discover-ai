import type OpenAI from 'openai'
import type {
  ExtendedChatCompletionMessageParam,
  ProductFilterParams,
} from '../types'

interface MockChatByFunctionResponse {
  messages: OpenAI.ChatCompletionMessageParam[]
  filter?: ProductFilterParams
}

export const getChatByFunctionMockResult = (
  messages: ExtendedChatCompletionMessageParam[],
): Promise<MockChatByFunctionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        filter: {
          color: 'white',
          type: 'dress',
        },
        messages: [
          ...messages,
          {
            role: 'assistant',
            content: null,
            function_call: {
              name: 'searchProducts',
              arguments: '{"color":"white","type":"dress"}',
            },
          },
          {
            role: 'function',
            name: 'searchProducts',
            content:
              '{"products":[{"id":"sw2208248101173885","name":"LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress"},{"id":"sw2211049001334380","name":"SHEIN MOD Plaid Print Tie Neck Flounce Sleeve Tweed Dress"},{"id":"sf2210106109540663","name":"SHEIN Unity Plus Contrast Dobby Mesh Flounce Sleeve Dress"},{"id":"sw2211288535270908","name":"Striped Print Drawstring Hooded Bodycon Dress"},{"id":"sw2203140200410623","name":"ROMWE PUNK Musical Note & Figure Graphic Bodycon Dress Without Belt Without Arm Sleeves"},{"id":"sw2211260550938103","name":"SHEIN Frenchy Guipure Lace Panel Belted Halter Dress"},{"id":"dress180913714","name":"SHEIN Unity Mock-neck Grid Flare Midi Dress"}]}',
          },
          {
            role: 'assistant',
            content:
              'Here are the top white dresses that would be perfect for a wedding:\n\n- sw2208248101173885: LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress\n- sw2211049001334380: SHEIN MOD Plaid Print Tie Neck Flounce Sleeve Tweed Dress\n- sf2210106109540663: SHEIN Unity Plus Contrast Dobby Mesh Flounce Sleeve Dress\n- sw2211288535270908: Striped Print Drawstring Hooded Bodycon Dress\n\nThese dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!\n\nTo narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.',
          },
        ],
      })
    }, 2000)
  })
}
