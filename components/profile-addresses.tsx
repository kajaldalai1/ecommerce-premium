"use client"

import type React from "react"

import { useState } from "react"
import { Edit, Plus, Trash } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export default function ProfileAddresses() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      line1: "123 Luxury Lane",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      isDefault: true,
      type: "both",
    },
    {
      id: "2",
      name: "John Doe",
      line1: "456 Premium Place",
      line2: "",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "United States",
      isDefault: false,
      type: "shipping",
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
    type: "both",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as "shipping" | "billing" | "both" }))
  }

  const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()

    const newAddress: Address = {
      id: Date.now().toString(),
      ...formData,
    }

    // If this is set as default, update other addresses
    let updatedAddresses = [...addresses]
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }))
    }

    setAddresses([...updatedAddresses, newAddress])
    setIsAddDialogOpen(false)
    setFormData({
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false,
      type: "both",
    })

    toast({
      title: "Address added",
      description: "Your new address has been added successfully.",
    })
  }

  const handleEditAddress = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentAddress) return

    // If this is set as default, update other addresses
    let updatedAddresses = [...addresses]
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === currentAddress.id ? true : false,
      }))
    }

    setAddresses(updatedAddresses.map((addr) => (addr.id === currentAddress.id ? { ...addr, ...formData } : addr)))

    setIsEditDialogOpen(false)
    setCurrentAddress(null)

    toast({
      title: "Address updated",
      description: "Your address has been updated successfully.",
    })
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))

    toast({
      title: "Address deleted",
      description: "Your address has been deleted successfully.",
    })
  }

  const openEditDialog = (address: Address) => {
    setCurrentAddress(address)
    setFormData({
      name: address.name,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
      type: address.type,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Your Addresses</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>Add a new shipping or billing address to your account.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAddress}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line1">Address Line 1</Label>
                  <Input id="line1" name="line1" value={formData.line1} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                  <Input id="line2" name="line2" value={formData.line2} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">ZIP / Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address Type</Label>
                  <RadioGroup value={formData.type} onValueChange={handleTypeChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shipping" id="shipping" />
                      <Label htmlFor="shipping">Shipping</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="billing" id="billing" />
                      <Label htmlFor="billing">Billing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both Shipping & Billing</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="isDefault" checked={formData.isDefault} onChange={handleDefaultChange} />
                  <Label htmlFor="isDefault">Set as default address</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Address</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{address.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {address.line1}
                    {address.line2 && <>, {address.line2}</>}
                    <br />
                    {address.city}, {address.state} {address.postalCode}
                    <br />
                    {address.country}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  {address.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mb-2">Default</span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {address.type === "both"
                      ? "Shipping & Billing"
                      : address.type === "shipping"
                        ? "Shipping"
                        : "Billing"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="ghost" size="sm" onClick={() => handleDeleteAddress(address.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(address)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Address</DialogTitle>
                    <DialogDescription>Update your address information.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEditAddress}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-line1">Address Line 1</Label>
                        <Input id="edit-line1" name="line1" value={formData.line1} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-line2">Address Line 2 (Optional)</Label>
                        <Input id="edit-line2" name="line2" value={formData.line2} onChange={handleChange} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-city">City</Label>
                          <Input id="edit-city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-state">State / Province</Label>
                          <Input id="edit-state" name="state" value={formData.state} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-postalCode">ZIP / Postal Code</Label>
                          <Input
                            id="edit-postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-country">Country</Label>
                          <Input
                            id="edit-country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Address Type</Label>
                        <RadioGroup value={formData.type} onValueChange={handleTypeChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="shipping" id="edit-shipping" />
                            <Label htmlFor="edit-shipping">Shipping</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="billing" id="edit-billing" />
                            <Label htmlFor="edit-billing">Billing</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="edit-both" />
                            <Label htmlFor="edit-both">Both Shipping & Billing</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="edit-isDefault"
                          checked={formData.isDefault}
                          onChange={handleDefaultChange}
                        />
                        <Label htmlFor="edit-isDefault">Set as default address</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface Address {
  id: string
  name: string
  line1: string
  line2: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  type: "shipping" | "billing" | "both"
}
