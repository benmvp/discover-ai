import type {
  ProductChatCompletionAssistantMessageParam,
  SheinProduct,
} from '@/app/types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

interface ProductCardProps {
  product: SheinProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
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

interface AssistantProps {
  message: ProductChatCompletionAssistantMessageParam
}
const PRODUCTS_LIST_TOKEN = '[PRODUCTS_LIST_HERE]'

const AssistantChatBubble = ({ message }: AssistantProps) => {
  const { products, tokenizedContent } = message
  const [tokenBefore, tokenAfter] = tokenizedContent.split(PRODUCTS_LIST_TOKEN)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Box
        sx={{
          bgcolor: 'success.main',
          color: 'success.contrastText',
          borderRadius: 6,
          borderTopLeftRadius: 0,
          padding: 2,
          maxWidth: '80%',
          overflow: 'hidden',

          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <div>{tokenBefore}</div>
        {products.length > 0 && (
          <Box
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
        )}
        {tokenAfter && <div>{tokenAfter}</div>}
      </Box>
    </Box>
  )
}

export default AssistantChatBubble
