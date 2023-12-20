import type { ParsedChatCompletionAssistantMessageParam } from '@/app/types'

interface AssistantProps {
  message: ParsedChatCompletionAssistantMessageParam
}
const PRODUCTS_LIST_TOKEN = '[PRODUCTS_LIST_HERE]'

const AssistantChatBubble = ({ message }: AssistantProps) => {
  const [tokenBefore, tokenAfter] =
    message.tokenizedContent.split(PRODUCTS_LIST_TOKEN)

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          background: '#eef3fc',
          borderRadius: '0 20px 20px',
          padding: 20,
          maxWidth: '80%',
        }}
      >
        <p>{tokenBefore}</p>
        <p>{message.skuIds.join(', ')}</p>
        <p>{tokenAfter}</p>
      </div>
    </div>
  )
}

export default AssistantChatBubble
