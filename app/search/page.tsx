"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, SearchIcon, SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Filter products based on search query, price range, and categories
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

    return matchesSearch && matchesPrice && matchesCategory
  })

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Search</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:flex flex-col w-64 space-y-6">
            <div>
              <h2 className="font-medium mb-4">Categories</h2>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="font-medium mb-4">Price Range</h2>
              <Slider
                defaultValue={[0, 5000]}
                max={5000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="font-medium mb-4">Sort By</h2>
              <RadioGroup value={sortBy} onValueChange={setSortBy}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="relevance" id="relevance" />
                  <Label htmlFor="relevance">Relevance</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="price-low-high" id="price-low-high" />
                  <Label htmlFor="price-low-high">Price: Low to High</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="price-high-low" id="price-high-low" />
                  <Label htmlFor="price-high-low">Price: High to Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rating" id="rating" />
                  <Label htmlFor="rating">Rating</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-96">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <p className="text-sm text-muted-foreground">Showing {sortedProducts.length} results</p>

                  {/* Filters - Mobile */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="md:hidden gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>Refine your search results</SheetDescription>
                      </SheetHeader>
                      <div className="space-y-6 py-4">
                        <div>
                          <h3 className="font-medium mb-4">Categories</h3>
                          <div className="space-y-3">
                            {categories.map((category) => (
                              <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-category-${category}`}
                                  checked={selectedCategories.includes(category)}
                                  onCheckedChange={() => handleCategoryChange(category)}
                                />
                                <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium mb-4">Price Range</h3>
                          <Slider
                            defaultValue={[0, 5000]}
                            max={5000}
                            step={100}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="mb-6"
                          />
                          <div className="flex items-center justify-between">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium mb-4">Sort By</h3>
                          <RadioGroup value={sortBy} onValueChange={setSortBy}>
                            <div className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value="relevance" id="mobile-relevance" />
                              <Label htmlFor="mobile-relevance">Relevance</Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value="price-low-high" id="mobile-price-low-high" />
                              <Label htmlFor="mobile-price-low-high">Price: Low to High</Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value="price-high-low" id="mobile-price-high-low" />
                              <Label htmlFor="mobile-price-high-low">Price: High to Low</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="rating" id="mobile-rating" />
                              <Label htmlFor="mobile-rating">Rating</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
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
                          <div className="text-lg font-semibold">${product.price.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center mt-4">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < product.rating ? "fill-amber-400 text-amber-400" : "text-muted"
                                  }`}
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
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-muted p-6 mb-6">
                    <SearchIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                  <p className="text-muted-foreground mb-6 text-center">
                    We couldn't find any products matching your search criteria.
                    <br />
                    Try adjusting your filters or search term.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setPriceRange([0, 5000])
                      setSortBy("relevance")
                      setSelectedCategories([])
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const categories = ["Watches", "Jewelry", "Accessories", "Outerwear", "Footwear"]

const products = [
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
    id: 2,
    name: "Precision Chronograph",
    category: "Watches",
    price: 2499,
    image: "/placeholder.svg?height=600&width=600",
    rating: 4,
    reviews: 89,
  },
  {
    id: 3,
    name: "Cashmere Blend Coat",
    category: "Outerwear",
    price: 1899,
    image: "/placeholder.svg?height=600&width=600",
    rating: 5,
    reviews: 67,
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
  {
    id: 6,
    name: "Silk Scarf",
    category: "Accessories",
    price: 299,
    image: "/placeholder.svg?height=600&width=600",
    rating: 4,
    reviews: 38,
  },
  {
    id: 7,
    name: "Gold Bracelet",
    category: "Jewelry",
    price: 1599,
    image: "/placeholder.svg?height=600&width=600",
    rating: 5,
    reviews: 29,
  },
  {
    id: 8,
    name: "Automatic Dive Watch",
    category: "Watches",
    price: 3299,
    image: "/placeholder.svg?height=600&width=600",
    rating: 5,
    reviews: 47,
  },
]
