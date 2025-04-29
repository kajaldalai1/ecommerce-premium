import Link from "next/link"
import { CheckCircle, ChevronRight, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  const orderNumber = "ORD-" + Math.floor(10000 + Math.random() * 90000)
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container max-w-3xl py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Order Confirmation</span>
        </div>

        <div className="flex flex-col items-center text-center mb-10">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-muted-foreground max-w-md">
            Your order has been received and is now being processed. We've sent a confirmation email to your inbox.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span>Credit Card (•••• 4242)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping Method:</span>
              <span>Standard Shipping</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Artisan Leather Bag"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Artisan Leather Bag</h3>
                  <p className="text-sm text-muted-foreground">Black, Medium</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">Qty: 1</span>
                    <span className="font-medium">$1,299.00</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Precision Chronograph"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Precision Chronograph</h3>
                  <p className="text-sm text-muted-foreground">Silver, 42mm</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">Qty: 1</span>
                    <span className="font-medium">$2,499.00</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$3,798.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$303.84</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>$4,111.84</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p>John Doe</p>
            <p>123 Luxury Lane</p>
            <p>Apt 4B</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  We're preparing your items for shipment. You'll receive an email once your order ships.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Your order is expected to arrive within 3-5 business days. You can track your shipment using the link
                  in your confirmation email.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
