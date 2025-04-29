"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, CreditCard, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import CheckoutSummary from "@/components/checkout-summary"
import StripePaymentForm from "@/components/stripe-payment-form"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState<"information" | "shipping" | "payment">("information")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInformationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStep("shipping")
  }

  const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase. Your order has been confirmed.",
      })
      router.push("/checkout/confirmation")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/cart" className="hover:text-foreground">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Checkout</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-muted-foreground mt-2">Complete your purchase securely</p>
            </div>

            <Tabs value={step} className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="information" disabled={step !== "information"}>
                  Information
                </TabsTrigger>
                <TabsTrigger value="shipping" disabled={step === "information"}>
                  Shipping
                </TabsTrigger>
                <TabsTrigger value="payment" disabled={step === "information" || step === "shipping"}>
                  Payment
                </TabsTrigger>
              </TabsList>

              <TabsContent value="information" className="pt-6">
                <form onSubmit={handleInformationSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                          <Input id="apartment" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State / Province</Label>
                            <Input id="state" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">ZIP / Postal code</Label>
                            <Input id="zip" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" required defaultValue="United States" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">Continue to Shipping</Button>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="shipping" className="pt-6">
                <form onSubmit={handleShippingSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                      <RadioGroup defaultValue="standard" className="space-y-4">
                        <div className="flex items-center justify-between border rounded-md p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-medium">
                              Standard Shipping
                            </Label>
                          </div>
                          <span>$10.00</span>
                        </div>
                        <div className="flex items-center justify-between border rounded-md p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="font-medium">
                              Express Shipping
                            </Label>
                          </div>
                          <span>$25.00</span>
                        </div>
                        <div className="flex items-center justify-between border rounded-md p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="overnight" id="overnight" />
                            <Label htmlFor="overnight" className="font-medium">
                              Overnight Shipping
                            </Label>
                          </div>
                          <span>$45.00</span>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                      <div className="flex items-center space-x-2 mb-4">
                        <input type="checkbox" id="sameAsBilling" defaultChecked />
                        <Label htmlFor="sameAsBilling">Same as billing address</Label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep("information")}>
                        Back to Information
                      </Button>
                      <Button type="submit">Continue to Payment</Button>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="payment" className="pt-6">
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={(value) => setPaymentMethod(value as "card" | "paypal")}
                      >
                        <div className="flex items-center justify-between border rounded-md p-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="font-medium flex items-center">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Credit / Debit Card
                            </Label>
                          </div>
                          <div className="flex space-x-2">
                            <img src="/placeholder.svg?height=24&width=36&text=Visa" alt="Visa" className="h-6" />
                            <img src="/placeholder.svg?height=24&width=36&text=MC" alt="Mastercard" className="h-6" />
                            <img
                              src="/placeholder.svg?height=24&width=36&text=Amex"
                              alt="American Express"
                              className="h-6"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between border rounded-md p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="font-medium">
                              PayPal
                            </Label>
                          </div>
                          <img src="/placeholder.svg?height=24&width=80&text=PayPal" alt="PayPal" className="h-6" />
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <Card>
                        <CardContent className="pt-6">
                          <StripePaymentForm />
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Payments are secure and encrypted</span>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep("shipping")}>
                        Back to Shipping
                      </Button>
                      <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Complete Order"}
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-[380px]">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
