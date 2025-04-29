"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileOrders() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-xs"
        />
        <Button variant="outline" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-6">
          <OrdersTable orders={filteredOrders} />
        </TabsContent>
        <TabsContent value="processing" className="pt-6">
          <OrdersTable orders={filteredOrders.filter((order) => order.status === "Processing")} />
        </TabsContent>
        <TabsContent value="shipped" className="pt-6">
          <OrdersTable orders={filteredOrders.filter((order) => order.status === "Shipped")} />
        </TabsContent>
        <TabsContent value="delivered" className="pt-6">
          <OrdersTable orders={filteredOrders.filter((order) => order.status === "Delivered")} />
        </TabsContent>
      </Tabs>

      {filteredOrders.length > 0 && (
        <div className="rounded-lg border p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Need Help With Your Order?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our customer service team is available 24/7 to assist you with any questions or concerns.
              </p>
              <Button variant="link" className="px-0 h-auto">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <Package className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-lg mb-2">No orders found</h3>
        <p className="text-muted-foreground mb-6">You haven't placed any orders yet or no orders match your search.</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>
              <div
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </div>
            </TableCell>
            <TableCell>${order.total.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/profile/orders/${order.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

interface Order {
  id: string
  date: string
  status: "Processing" | "Shipped" | "Delivered"
  total: number
}

const orders: Order[] = [
  {
    id: "ORD-7352",
    date: "Apr 23, 2023",
    status: "Delivered",
    total: 1299,
  },
  {
    id: "ORD-7351",
    date: "Mar 15, 2023",
    status: "Delivered",
    total: 2499,
  },
  {
    id: "ORD-7350",
    date: "Feb 28, 2023",
    status: "Delivered",
    total: 899,
  },
  {
    id: "ORD-7349",
    date: "Jan 12, 2023",
    status: "Delivered",
    total: 3499,
  },
  {
    id: "ORD-7348",
    date: "Apr 29, 2023",
    status: "Processing",
    total: 1899,
  },
  {
    id: "ORD-7347",
    date: "Apr 27, 2023",
    status: "Shipped",
    total: 2199,
  },
]
