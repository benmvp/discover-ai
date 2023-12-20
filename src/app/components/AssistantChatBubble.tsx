import type {
  ParsedChatCompletionAssistantMessageParam,
  SheinProduct,
} from '@/app/types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { getProducts } from '../ai/products'

interface ProductCardProps {
  product: SheinProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card component="section" sx={{ maxWidth: 300 }}>
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
  message: ParsedChatCompletionAssistantMessageParam
}
const PRODUCTS_LIST_TOKEN = '[PRODUCTS_LIST_HERE]'

const AssistantChatBubble = ({ message }: AssistantProps) => {
  const products = getProducts(message.skuIds)
  const [tokenBefore, tokenAfter] =
    message.tokenizedContent.split(PRODUCTS_LIST_TOKEN)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Box
        sx={{
          bgcolor: 'divider',
          color: 'text.primary',
          borderRadius: 2,
          borderTopLeftRadius: 0,
          padding: 2,
          maxWidth: '80%',
          overflow: 'hidden',
        }}
      >
        <p>{tokenBefore}</p>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.skuId} product={product} />
          ))}
        </Box>
        <p>{tokenAfter}</p>
      </Box>
    </Box>
  )
}

export default AssistantChatBubble
