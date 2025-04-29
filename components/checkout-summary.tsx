import { Separator } from "@/components/ui/separator"

export default function CheckoutSummary() {
  // In a real app, this would come from a cart state or API
  const cartItems = [
    {
      id: 1,
      name: "Artisan Leather Bag",
      price: 1299,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      color: "Black",
      size: "Medium",
    },
    {
      id: 2,
      name: "Precision Chronograph",
      price: 2499,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      color: "Silver",
      size: "42mm",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                {item.color}, {item.size}
              </p>
              <div className="flex justify-between mt-1">
                <span className="text-sm">Qty: {item.quantity}</span>
                <span className="font-medium">${item.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>${shipping.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>${tax.toLocaleString()}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-medium text-lg">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>

      <div className="mt-6 text-xs text-muted-foreground">
        <p>
          By completing your purchase, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
