"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, CreditCard, Package, Settings, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ProfileOrders from "@/components/profile-orders"
import ProfileDetails from "@/components/profile-details"
import ProfileAddresses from "@/components/profile-addresses"
import ProfilePaymentMethods from "@/components/profile-payment-methods"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">My Account</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                  <TabsList className="flex flex-col h-auto items-stretch justify-start rounded-none border-r">
                    <TabsTrigger
                      value="orders"
                      className="justify-start rounded-none border-b px-6 py-3 data-[state=active]:border-r-2 data-[state=active]:border-r-primary"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="justify-start rounded-none border-b px-6 py-3 data-[state=active]:border-r-2 data-[state=active]:border-r-primary"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Personal Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="addresses"
                      className="justify-start rounded-none border-b px-6 py-3 data-[state=active]:border-r-2 data-[state=active]:border-r-primary"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Addresses
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      className="justify-start rounded-none px-6 py-3 data-[state=active]:border-r-2 data-[state=active]:border-r-primary"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "orders" && "Order History"}
                  {activeTab === "details" && "Personal Details"}
                  {activeTab === "addresses" && "Addresses"}
                  {activeTab === "payment" && "Payment Methods"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "orders" && "View and manage your orders"}
                  {activeTab === "details" && "Update your personal information"}
                  {activeTab === "addresses" && "Manage your shipping and billing addresses"}
                  {activeTab === "payment" && "Manage your payment methods"}
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                {activeTab === "orders" && <ProfileOrders />}
                {activeTab === "details" && <ProfileDetails />}
                {activeTab === "addresses" && <ProfileAddresses />}
                {activeTab === "payment" && <ProfilePaymentMethods />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
