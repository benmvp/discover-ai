import OpenAI from 'openai'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Skeleton } from '@mui/material'
import Typography from '@mui/material/Typography'
import type { SheinProduct } from '@/app/types'
import { isParsedAssistantMessage, isProductAssistantMessage } from './utils'

const ProductCard = ({ product }: { product: SheinProduct }) => {
  return (
    <Card component="section" sx={{ maxWidth: '40%', minWidth: '200px' }}>
      <CardActionArea href={product.url} target="_blank">
        <CardMedia component="img" height="300" image={product.image} alt="" />
        <CardContent>
          <Typography gutterBottom variant="body1" component="h1">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`\$${product.price.toFixed(2)}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const ProductCardSkeleton = ({ index }: { index: number }) => {
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

const AssistantChatBubbleContent = ({
  message,
}: {
  message: OpenAI.ChatCompletionAssistantMessageParam
}) => {
  if (!isParsedAssistantMessage(message)) {
    return null
  }

  const { skuIds: groupedSkuIds, tokenizedContent } = message

  return (
    <>
      {groupedSkuIds.map((skuIds, index) => {
        const content = tokenizedContent[index]

        // `skuIds` is empty when there are no SKUs to recommend. But there is
        // content in `tokenizedContent` to display.
        if (skuIds.length === 0) {
          return <Box key={content}>{content}</Box>
        }

        // On the other hand, when `skuIds` is not empty we either have SKUs to show or we're in a stream loading state (and the `tokenizedContent` is `null` in this case).

        const products = isProductAssistantMessage(message)
          ? message.products
          : {}

        return (
          skuIds.length > 0 && (
            <Box
              key={skuIds.join('-')}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'nowrap',
                gap: 2,
                overflowX: 'auto',
              }}
            >
              {skuIds.map((skuId, index) =>
                products[skuId] ? (
                  <ProductCard key={skuId} product={products[skuId]} />
                ) : (
                  <ProductCardSkeleton key={skuId} index={index} />
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
