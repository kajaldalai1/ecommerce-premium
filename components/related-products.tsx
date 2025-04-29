import Link from "next/link"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface RelatedProductsProps {
  currentProductId: string
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Filter out the current product
  const filteredProducts = products.filter((product) => product.id.toString() !== currentProductId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden border-0 shadow-md">
          <div className="aspect-square relative overflow-hidden bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">
                  <Link href={`/products/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{product.category}</p>
              </div>
              <div className="text-lg font-semibold">${product.price}</div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                    />
                  ))}
              </div>
              <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
            </div>
            <Button className="w-full mt-6">Add to Cart</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const products = [
  {
    id: 1,
    name: "Artisan Leather Bag",
    category: "Accessories",
    price: "1,299",
    image: "/placeholder.svg?height=600&width=600",
    rating: 5,
    reviews: 124,
  },
  {
    id: 2,
    name: "Precision Chronograph",
    category: "Watches",
    price: "2,499",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4,
    reviews: 89,
  },
  {
    id: 3,
    name: "Cashmere Blend Coat",
    category: "Outerwear",
    price: "1,899",
    image: "/placeholder.svg?height=600&width=600",
    rating: 5,
    reviews: 67,
  },
  {
    id: 4,
    name: "Diamond Pendant",
    category: "Jewelry",
    price: "3,499",
    image: "/placeholder.svg?height=600&width=600",
    rating: 5,
    reviews: 42,
  },
  {
    id: 5,
    name: "Italian Leather Shoes",
    category: "Footwear",
    price: "899",
    image: "/placeholder.svg?height=600&width=600",
    rating: 4,
    reviews: 56,
  },
]
