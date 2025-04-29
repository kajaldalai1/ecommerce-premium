"use client"
import { DollarSign, Download, Package, Settings, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminSidebar from "@/components/admin-sidebar"
import AdminHeader from "@/components/admin-header"
import SalesChart from "@/components/sales-chart"

export default function AdminDashboard() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar />

      <div className="flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button size="sm" className="h-9">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">Orders</CardTitle>
                      <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2,350</div>
                      <p className="text-xs text-muted-foreground">+12.2% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">Products</CardTitle>
                      <Package className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">124</div>
                      <p className="text-xs text-muted-foreground">+4 new products added</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">573</div>
                      <p className="text-xs text-muted-foreground">+18.7% from last month</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <SalesChart />
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>You have 12 orders this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">#{order.id}</TableCell>
                              <TableCell>
                                <div
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    order.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Processing"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status}
                                </div>
                              </TableCell>
                              <TableCell>${order.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Top Products</CardTitle>
                      <CardDescription>Your best selling products this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Sales</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>${product.revenue.toLocaleString()}</TableCell>
                              <TableCell>{product.sales}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Sales by Category</CardTitle>
                      <CardDescription>Category distribution for this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {salesByCategory.map((category) => (
                          <div key={category.name} className="flex items-center">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: category.color }} />
                            <div className="flex-1 flex justify-between items-center">
                              <span className="text-sm font-medium">{category.name}</span>
                              <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                            </div>
                          </div>
                        ))}

                        <div className="pt-4 mt-4 border-t">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Total Sales</span>
                            <span className="font-medium">$45,231.89</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

const recentOrders = [
  { id: "ORD-7352", status: "Completed", amount: "1,299.00" },
  { id: "ORD-7351", status: "Processing", amount: "2,499.00" },
  { id: "ORD-7350", status: "Pending", amount: "899.00" },
  { id: "ORD-7349", status: "Completed", amount: "3,499.00" },
  { id: "ORD-7348", status: "Completed", amount: "1,899.00" },
]

const topProducts = [
  { id: 1, name: "Precision Chronograph", category: "Watches", revenue: 12495, sales: 5 },
  { id: 2, name: "Artisan Leather Bag", category: "Accessories", revenue: 10392, sales: 8 },
  { id: 3, name: "Diamond Pendant", category: "Jewelry", revenue: 10497, sales: 3 },
  { id: 4, name: "Cashmere Blend Coat", category: "Outerwear", revenue: 9495, sales: 5 },
  { id: 5, name: "Italian Leather Shoes", category: "Footwear", revenue: 7192, sales: 8 },
]

const salesByCategory = [
  { name: "Watches", percentage: 35, color: "#0ea5e9" },
  { name: "Jewelry", percentage: 25, color: "#f59e0b" },
  { name: "Accessories", percentage: 20, color: "#10b981" },
  { name: "Outerwear", percentage: 15, color: "#8b5cf6" },
  { name: "Footwear", percentage: 5, color: "#ec4899" },
]
