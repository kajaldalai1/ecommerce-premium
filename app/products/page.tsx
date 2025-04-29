import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Check, ChevronRight, Heart, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductImageGallery from "@/components/product-image-gallery"
import RelatedProducts from "@/components/related-products"
import ProductSkeleton from "@/components/product-skeleton"

async function getProduct(id: string) {
  // In a real app, this would fetch from an API
  return products.find((product) => product.id.toString() === id) || products[0]
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Product Details</span>
        </div>

        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails id={params.id} />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductDetails({ id }: { id: string }) {
  const product = await getProduct(id)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <ProductImageGallery images={product.images} />

        <div className="flex flex-col">
          <Link href="/products" className="flex items-center text-sm text-muted-foreground mb-4 hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>

          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center mt-2 mb-4">
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
            <span className="text-sm text-muted-foreground ml-2">({product.reviews} reviews)</span>
          </div>

          <div className="text-2xl font-semibold mb-6">${product.price}</div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  className={`relative w-10 h-10 rounded-full cursor-pointer border-2 ${color.selected ? "border-black" : "border-transparent"}`}
                >
                  <div className="absolute inset-1 rounded-full" style={{ backgroundColor: color.hex }} />
                  {color.selected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <div
                  key={size.name}
                  className={`flex items-center justify-center w-12 h-12 rounded-md border cursor-pointer ${size.selected ? "bg-black text-white border-black" : "border-gray-200 hover:border-gray-300"}`}
                >
                  {size.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button className="flex-1 gap-2">
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>Free returns within 30 days</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>2-year warranty on all products</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="description"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none py-3 px-6"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none py-3 px-6"
          >
            Details & Care
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none py-3 px-6"
          >
            Reviews ({product.reviews})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <div className="max-w-3xl">
            <p className="text-muted-foreground mb-4">{product.longDescription}</p>
            <p className="text-muted-foreground">
              Crafted with meticulous attention to detail, this piece exemplifies our commitment to quality and luxury.
              Each element has been carefully considered to ensure both aesthetic appeal and functional excellence.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="details" className="pt-6">
          <div className="max-w-3xl">
            <h3 className="font-medium mb-3">Materials</h3>
            <p className="text-muted-foreground mb-6">
              Premium materials sourced from the finest suppliers worldwide. Ethically produced and sustainably
              manufactured.
            </p>

            <h3 className="font-medium mb-3">Dimensions</h3>
            <p className="text-muted-foreground mb-6">
              Please refer to the size guide for detailed measurements. Each size is carefully calibrated to ensure the
              perfect fit.
            </p>

            <h3 className="font-medium mb-3">Care Instructions</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>Clean with a soft, dry cloth</li>
              <li>Store in the provided dust bag when not in use</li>
              <li>Avoid exposure to direct sunlight and moisture</li>
              <li>Professional cleaning recommended for stubborn stains</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="max-w-3xl space-y-6">
            {productReviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.avatar || "/placeholder.svg?height=50&width=50"}
                      alt={review.name}
                      className="rounded-full h-12 w-12 object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                        />
                      ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <RelatedProducts currentProductId={id} />
      </div>
    </>
  )
}

const products = [
  {
    id: 1,
    name: "Artisan Leather Bag",
    category: "Accessories",
    price: "1,299",
    description:
      "Handcrafted from premium Italian leather, this bag combines timeless elegance with modern functionality.",
    longDescription:
      "The Artisan Leather Bag represents the pinnacle of luxury craftsmanship. Each bag is meticulously handcrafted by master artisans using the finest Italian leather, selected for its exceptional quality and natural grain. The design balances timeless elegance with contemporary functionality, featuring a spacious interior with multiple compartments and a secure closure system.",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800&text=Detail+View",
      "/placeholder.svg?height=800&width=800&text=Side+View",
      "/placeholder.svg?height=800&width=800&text=Interior+View",
    ],
    rating: 5,
    reviews: 124,
    colors: [
      { name: "Black", hex: "#000000", selected: true },
      { name: "Brown", hex: "#964B00", selected: false },
      { name: "Navy", hex: "#000080", selected: false },
    ],
    sizes: [
      { name: "S", selected: false },
      { name: "M", selected: true },
      { name: "L", selected: false },
    ],
  },
  {
    id: 2,
    name: "Precision Chronograph",
    category: "Watches",
    price: "2,499",
    description: "Swiss-made chronograph with exceptional precision and elegant design for the discerning collector.",
    longDescription:
      "The Precision Chronograph represents the perfect fusion of traditional Swiss watchmaking and contemporary design. Each timepiece is assembled by master horologists using components of the highest quality. The movement, renowned for its exceptional accuracy, is housed in a case crafted from premium materials that have been polished to perfection.",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800&text=Watch+Front",
      "/placeholder.svg?height=800&width=800&text=Watch+Side",
      "/placeholder.svg?height=800&width=800&text=Watch+Back",
      "/placeholder.svg?height=800&width=800&text=Watch+Detail",
    ],
    rating: 4,
    reviews: 89,
    colors: [
      { name: "Silver", hex: "#C0C0C0", selected: true },
      { name: "Gold", hex: "#FFD700", selected: false },
      { name: "Rose Gold", hex: "#B76E79", selected: false },
    ],
    sizes: [
      { name: "38mm", selected: false },
      { name: "42mm", selected: true },
      { name: "46mm", selected: false },
    ],
  },
  {
    id: 3,
    name: "Cashmere Blend Coat",
    category: "Outerwear",
    price: "1,899",
    description: "Luxurious cashmere blend coat that combines warmth with sophisticated tailoring and timeless style.",
    longDescription:
      "The Cashmere Blend Coat embodies luxury in its purest form. Crafted from an exquisite blend of cashmere and fine wool, this coat offers unparalleled warmth and comfort without compromising on style. The tailoring is impeccable, with clean lines and a silhouette that flatters any figure. Attention to detail is evident in every aspect, from the hand-finished seams to the premium horn buttons.",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800&text=Coat+Front",
      "/placeholder.svg?height=800&width=800&text=Coat+Back",
      "/placeholder.svg?height=800&width=800&text=Coat+Detail",
      "/placeholder.svg?height=800&width=800&text=Fabric+Close-up",
    ],
    rating: 5,
    reviews: 67,
    colors: [
      { name: "Camel", hex: "#C19A6B", selected: true },
      { name: "Charcoal", hex: "#36454F", selected: false },
      { name: "Navy", hex: "#000080", selected: false },
    ],
    sizes: [
      { name: "S", selected: false },
      { name: "M", selected: false },
      { name: "L", selected: true },
      { name: "XL", selected: false },
    ],
  },
]

const productReviews = [
  {
    id: 1,
    name: "Jonathan Miller",
    date: "May 15, 2023",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Exceptional quality and craftsmanship. This product exceeded my expectations in every way. The attention to detail is remarkable, and it's clear that no compromises were made in its creation. Worth every penny.",
  },
  {
    id: 2,
    name: "Elizabeth Chen",
    date: "April 3, 2023",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Beautiful design and excellent materials. The only reason I'm not giving five stars is that delivery took longer than expected. Otherwise, the product itself is nearly perfect.",
  },
  {
    id: 3,
    name: "Michael Thompson",
    date: "March 22, 2023",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "I've purchased many luxury items over the years, and this ranks among the best. The quality is consistent with the price point, and the design is both functional and aesthetically pleasing. Highly recommended.",
  },
]
