"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Heart, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Artisan Leather Bag",
      category: "Accessories",
      price: 1299,
      image: "/placeholder.svg?height=600&width=600",
      rating: 5,
      reviews: 124,
    },
    {
      id: 4,
      name: "Diamond Pendant",
      category: "Jewelry",
      price: 3499,
      image: "/placeholder.svg?height=600&width=600",
      rating: 5,
      reviews: 42,
    },
    {
      id: 5,
      name: "Italian Leather Shoes",
      category: "Footwear",
      price: 899,
      image: "/placeholder.svg?height=600&width=600",
      rating: 4,
      reviews: 56,
    },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    })
  }

  const addToCart = (id: number) => {
    // In a real app, this would add the item to the cart
    toast({
      title: "Added to cart",
      description: "The item has been added to your cart.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Wishlist</span>
        </div>

        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden border-0 shadow-md">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-rose-500"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">
                        <Link href={`/products/${item.id}`} className="hover:underline">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{item.category}</p>
                    </div>
                    <div className="text-lg font-semibold">${item.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < item.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                          />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">({item.reviews})</span>
                  </div>
                  <Button className="w-full mt-6" onClick={() => addToCart(item.id)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-6 mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Items added to your wishlist will be saved here.
              <br />
              Start exploring our products to add items to your wishlist.
            </p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

interface WishlistItem {
  id: number
  name: string
  category: string
  price: number
  image: string
  rating: number
  reviews: number
}
