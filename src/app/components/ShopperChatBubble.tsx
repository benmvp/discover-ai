import type OpenAI from 'openai'

interface ShopperProps {
  message: OpenAI.ChatCompletionUserMessageParam
}

const ShopperChatBubble = ({ message }: ShopperProps) => {
  if (typeof message.content !== 'string') {
    return null
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{
          background: '#518edb',
          color: 'white',
          borderRadius: '20px 20px 0',
          padding: 20,
          maxWidth: '50%',
        }}
      >
        {message.content}
      </div>
    </div>
  )
}
export default ShopperChatBubble
