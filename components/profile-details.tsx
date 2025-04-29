"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function ProfileDetails() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would send the data to an API
    setTimeout(() => {
      setIsEditing(false)
      toast({
        title: "Profile updated",
        description: "Your personal details have been updated successfully.",
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          {isEditing ? (
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </form>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Password</h3>
        <Button variant="outline">Change Password</Button>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Email Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="orderUpdates" defaultChecked />
            <Label htmlFor="orderUpdates">Order updates</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="promotions" defaultChecked />
            <Label htmlFor="promotions">Promotions and sales</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="newProducts" defaultChecked />
            <Label htmlFor="newProducts">New product announcements</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="newsletter" />
            <Label htmlFor="newsletter">Newsletter</Label>
          </div>
        </div>
        <Button className="mt-4" variant="outline">
          Update Preferences
        </Button>
      </div>
    </div>
  )
}
