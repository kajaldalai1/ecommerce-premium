"use client"

import { useState } from "react"
import { CreditCard, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import StripePaymentForm from "@/components/stripe-payment-form"

export default function ProfilePaymentMethods() {
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      cardType: "Visa",
      lastFour: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
    },
    {
      id: "2",
      cardType: "Mastercard",
      lastFour: "5678",
      expiryMonth: "09",
      expiryYear: "2024",
      isDefault: false,
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<PaymentMethod | null>(null)

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))

    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully.",
    })
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    })
  }

  const handleAddPaymentMethod = () => {
    // In a real app, this would process the Stripe form data
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      cardType: "Visa",
      lastFour: "1234",
      expiryMonth: "06",
      expiryYear: "2026",
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setIsAddDialogOpen(false)

    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Your Payment Methods</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <StripePaymentForm />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddPaymentMethod}>
                Add Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {method.cardType === "Visa" ? (
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-3">VISA</div>
                  ) : method.cardType === "Mastercard" ? (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded mr-3">MC</div>
                  ) : (
                    <CreditCard className="h-5 w-5 mr-3" />
                  )}
                  <div>
                    <h4 className="font-medium">
                      {method.cardType} •••• {method.lastFour}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="ghost" size="sm" onClick={() => handleDeletePaymentMethod(method.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Remove
              </Button>
              {!method.isDefault && (
                <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                  Set as Default
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <div className="text-center py-12">
          <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-lg mb-2">No payment methods</h3>
          <p className="text-muted-foreground mb-6">You haven't added any payment methods yet.</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>Add Payment Method</Button>
        </div>
      )}

      <div className="rounded-lg border p-6 mt-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Secure Payment Processing</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All payment information is encrypted and securely stored. We never store your full card details on our
              servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PaymentMethod {
  id: string
  cardType: string
  lastFour: string
  expiryMonth: string
  expiryYear: string
  isDefault: boolean
}
