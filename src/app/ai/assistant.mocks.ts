import type OpenAI from 'openai'
import type { ExtendedChatCompletionMessageParam } from '../types'

export const getChatByFunctionMockResult = (
  messages: ExtendedChatCompletionMessageParam[],
): Promise<OpenAI.ChatCompletionMessageParam[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        ...messages,
        {
          role: 'assistant',
          content: null,
          tool_calls: [
            {
              id: 'call_CgaPEcrGURfAlpGMHOPN7KCi',
              type: 'function',
              function: {
                name: 'searchProducts',
                arguments:
                  '{\n  "type": "dress",\n  "color": "red",\n  "length": "midi"\n}',
              },
            },
          ],
        },
        {
          role: 'tool',
          tool_call_id: 'call_CgaPEcrGURfAlpGMHOPN7KCi',
          content:
            '{"products":[{"id":"sw2207053173976788","name":"SHEIN BAE Cowl Neck Asymmetrical Hem Cami Dress"},{"id":"sw2212060000028608","name":"Dalmatian Print Pleated Hem Belted Cami Dress"},{"id":"sw2212021537374152","name":"D&M Draped Collar Slit Thigh Contrast Sequin Satin Cami Dress"},{"id":"sw2203019075034171","name":"Solid Cut Out Bandage Dress"},{"id":"swdress03190702073","name":"ADYCE One Shoulder Backless Split Thigh Bodycon Midi Elegant Party Bandage Dress"},{"id":"sf2209138896666269","name":"SHEIN Unity Plus Ombre Pleated Halter Dress"},{"id":"sw2209287435718119","name":"SHEIN BAE Floral Print Ruched Side Bodycon Dress"},{"id":"sw2202233125991401","name":"SHEIN Belle Cut Out Crisscross Split Thigh Cami Bodycon Dress"},{"id":"sw2211098685460256","name":"One Shoulder Wrap Hem Belted Dress"},{"id":"sw2207225944582776","name":"Solid Ruffle Trim Belted Wrap Cami Dress"}]}',
        },
        {
          role: 'assistant',
          content:
            'Fabulous choice! Here are my top 5 recommendations for red midi dresses:\n' +
            '\n' +
            '- [sw2207053173976788]: SHEIN BAE Cowl Neck Asymmetrical Hem Cami Dress\n' +
            '- [sw2212060000028608]: Dalmatian Print Pleated Hem Belted Cami Dress\n' +
            '- [sw2212021537374152]: D&M Draped Collar Slit Thigh Contrast Sequin Satin Cami Dress\n' +
            '- [sw2203019075034171]: Solid Cut Out Bandage Dress\n' +
            '- [swdress03190702073]: ADYCE One Shoulder Backless Split Thigh Bodycon Midi Elegant Party Bandage Dress\n' +
            '\n' +
            "Each of these dresses is a fashionable midi length, and extra excitingly, they're all in your chosen color - red! You can further narrow down my recommendations by indicating the preferred pattern or style. Have fun picking your favorite!",
          filter: { type: 'dress', color: 'red', length: 'midi' },
          skuIds: [
            [],
            [
              'sw2207053173976788',
              'sw2212060000028608',
              'sw2212021537374152',
              'sw2203019075034171',
              'swdress03190702073',
            ],
            [],
          ],
          tokenizedContent: [
            'Fabulous choice! Here are my top 5 recommendations for red midi dresses:',
            null,
            "Each of these dresses is a fashionable midi length, and extra excitingly, they're all in your chosen color - red! You can further narrow down my recommendations by indicating the preferred pattern or style. Have fun picking your favorite!",
          ],
        },
      ])
    }, 2000)
  })
}
