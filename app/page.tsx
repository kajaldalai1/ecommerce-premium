import Link from "next/link"
import { ArrowRight, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6" />
              <span className="font-semibold tracking-wide">LUXE</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Shop
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Collections
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div
            className="h-[600px] bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=1200&width=2000')" }}
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Luxury Redefined</h1>
              <p className="mt-6 max-w-md mx-auto text-lg text-white/90">
                Discover our exclusive collection of premium products crafted for the discerning customer.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  Explore Collections
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="mt-4 text-muted-foreground max-w-[700px]">
              Our most sought-after pieces, meticulously crafted with premium materials and exceptional attention to
              detail.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
                      <h3 className="font-medium text-lg">{product.name}</h3>
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
          <div className="flex justify-center mt-12">
            <Button variant="outline" className="gap-2">
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="py-24 bg-muted/50">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Premium Categories</h2>
              <p className="mt-4 text-muted-foreground max-w-[700px]">
                Explore our carefully curated collections, each representing the pinnacle of luxury and style.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div key={category.id} className="relative h-[300px] overflow-hidden rounded-lg group">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white">
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                    <Button variant="outline" className="mt-4 text-white border-white hover:bg-white/10">
                      Explore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">What Our Clients Say</h2>
            <p className="mt-4 text-muted-foreground max-w-[700px]">
              Discover why discerning customers choose our premium products and exceptional service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                </div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-24 bg-black text-white">
          <div className="container">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight">Join Our Exclusive List</h2>
              <p className="mt-4 text-white/80">
                Subscribe to receive updates on new collections, exclusive offers, and luxury insights.
              </p>
              <div className="mt-8 flex gap-2">
                <input type="email" placeholder="Enter your email" className="flex-1 rounded-md px-4 py-2 text-black" />
                <Button className="bg-white text-black hover:bg-white/90">Subscribe</Button>
              </div>
              <p className="mt-4 text-sm text-white/60">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6" />
                <span className="font-semibold tracking-wide">LUXE</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Redefining luxury shopping with premium products and exceptional service since 2010.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} LUXE. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const featuredProducts = [
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
]

const categories = [
  {
    id: 1,
    name: "Jewelry",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 2,
    name: "Watches",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 3,
    name: "Accessories",
    image: "/placeholder.svg?height=600&width=600",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Alexandra Chen",
    location: "New York, USA",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "The quality of craftsmanship is exceptional. Every detail speaks of luxury and attention to detail. Truly worth the investment.",
  },
  {
    id: 2,
    name: "James Wilson",
    location: "London, UK",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "I've been a loyal customer for years. Their products stand the test of time and their customer service is impeccable.",
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    location: "Milan, Italy",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "The shopping experience is as premium as the products themselves. From browsing to unboxing, everything feels special.",
  },
]
