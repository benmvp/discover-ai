import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Skeleton } from '@mui/material'
import Typography from '@mui/material/Typography'
import Markdown from './Markdown'
import { Message } from '@/app/types'
import {
  isItemAssistantMessage,
  isParsedAssistantMessage,
} from '../items/utils'
import { Item } from '../items/types'

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Card component="section" sx={{ maxWidth: '40%', minWidth: '300px' }}>
      <CardActionArea href={item.url} target="_blank">
        <CardMedia component="img" height="300" image={item.imageUrl} alt="" />
        <CardContent>
          <Typography gutterBottom variant="body1" component="h1">
            {item.title}
          </Typography>
          {item.price && (
            <Typography variant="body2" color="text.secondary">
              {`\$${item.price.toFixed(2)}`}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const ItemCardLoading = () => {
  return (
    <Card component="section" sx={{ maxWidth: '40%', minWidth: '200px' }}>
      <Skeleton width={200} height={300} />
      <CardContent>
        <Skeleton />
        <Skeleton />
      </CardContent>
    </Card>
  )
}

const TextContentOnly = ({ content }: { content: string | null }) =>
  content && (
    <Box>
      <Markdown>{content}</Markdown>
    </Box>
  )

const AssistantChatBubbleContent = ({ message }: { message: Message }) => {
  if (!isParsedAssistantMessage(message)) {
    return null
  }

  const { parsedContent: parsedContentList } = message
  const items = isItemAssistantMessage(message) ? message.items : {}

  return (
    <>
      {parsedContentList.map((parsedContent, index) => {
        const content = typeof parsedContent === 'string' ? parsedContent : null
        const itemIds = Array.isArray(parsedContent) ? parsedContent : []

        // When there is content, there are now recommended items to show.
        if (content) {
          return <TextContentOnly key={content} content={content} />
        }

        // On the other hand, when `itemIds` is not empty we either have items
        // to show or we're in a stream loading state.

        return (
          itemIds.length > 0 && (
            <Box
              key={itemIds.join('-')}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'nowrap',
                gap: 2,
                overflowX: 'auto',
              }}
            >
              {itemIds.map((itemId, index) =>
                items[itemId] ? (
                  <ItemCard key={itemId} item={items[itemId]} />
                ) : (
                  <ItemCardLoading key={itemId} />
                ),
              )}
            </Box>
          )
        )
      })}
      {message?.filter && (
        <Typography component="div" variant="caption">
          {JSON.stringify(message.filter)}
        </Typography>
      )}
    </>
  )
}

export default AssistantChatBubbleContent
