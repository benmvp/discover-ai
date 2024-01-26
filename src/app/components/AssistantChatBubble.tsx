import type {
  ProductChatCompletionAssistantMessageParam,
  SheinProduct,
} from '@/app/types'
import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const LoadingCircle = styled(Box)({
  '@keyframes pulse': {
    from: { opacity: 0 },
    '50%': { opacity: 1 },
    to: { opacity: 0 },
  },
  animation: 'pulse 0.75s infinite',
  background: 'white',
  width: 15,
  height: 15,
  borderRadius: '50%',
})

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <LoadingCircle />
      <LoadingCircle sx={{ animationDelay: '75ms' }} />
      <LoadingCircle sx={{ animationDelay: '150ms' }} />
    </Box>
  )
}

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

const Content = ({
  message,
}: {
  message: ProductChatCompletionAssistantMessageParam
}) => {
  const {
    products: allProducts,
    skuIds: groupedSkuIds,
    tokenizedContent,
  } = message

  return (
    <>
      {groupedSkuIds.map((skuIds, index) => {
        const content = tokenizedContent[index]

        // `skuIds` is empty when there are no SKUs to recommend. But there is
        // content in `tokenizedContent` to display.
        if (skuIds.length === 0 && content) {
          return (
            <div key={content} dangerouslySetInnerHTML={{ __html: content }} />
          )
        }

        // On the other hand, `skuIds` is not empty when there are SKUs to show (and the `tokenizedContent` is `null` in this case).
        const products = skuIds.map((skuId) => allProducts[skuId])

        return (
          products.length > 0 && (
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
              {products.map((product) => (
                <ProductCard key={product.skuId} product={product} />
              ))}
            </Box>
          )
        )
      })}
    </>
  )
}

interface Props {
  message?: ProductChatCompletionAssistantMessageParam
}

const AssistantChatBubble = ({ message }: Props) => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'success.main',
          color: 'success.contrastText',
          borderRadius: 6,
          borderTopLeftRadius: 0,
          padding: 2,
          maxWidth: message ? '80%' : undefined,
          overflow: 'hidden',

          display: message ? 'flex' : 'inline-block',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {message ? <Content message={message} /> : <Loading />}
      </Box>
      {message?.filter && (
        <Typography
          component="div"
          variant="caption"
          color="text.disabled"
          mb={2}
        >
          {JSON.stringify(message.filter)}
        </Typography>
      )}
    </Box>
  )
}

export default AssistantChatBubble
