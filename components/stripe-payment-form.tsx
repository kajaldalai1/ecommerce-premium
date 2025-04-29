"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StripePaymentForm() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [name, setName] = useState("")
  const [focus, setFocus] = useState<string | null>(null)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value)
    setCardNumber(value)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatExpiry(e.target.value)
    setExpiry(value)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardName">Name on card</Label>
        <Input
          id="cardName"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocus("name")}
          onBlur={() => setFocus(null)}
          className={focus === "name" ? "border-primary" : ""}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card number</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            onFocus={() => setFocus("number")}
            onBlur={() => setFocus(null)}
            className={focus === "number" ? "border-primary" : ""}
            maxLength={19}
            required
          />
          {cardNumber.startsWith("4") && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="bg-blue-500 text-white text-xs px-1 rounded">VISA</div>
            </div>
          )}
          {cardNumber.startsWith("5") && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="bg-red-500 text-white text-xs px-1 rounded">MC</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={expiry}
            onChange={handleExpiryChange}
            onFocus={() => setFocus("expiry")}
            onBlur={() => setFocus(null)}
            className={focus === "expiry" ? "border-primary" : ""}
            maxLength={5}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder="123"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
            onFocus={() => setFocus("cvc")}
            onBlur={() => setFocus(null)}
            className={focus === "cvc" ? "border-primary" : ""}
            maxLength={4}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm">
        <Check className="h-4 w-4 text-green-500" />
        <span>We never store your full card details</span>
      </div>
    </div>
  )
}
