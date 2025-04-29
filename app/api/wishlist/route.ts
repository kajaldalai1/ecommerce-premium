import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would interact with a database
let wishlistItems: WishlistItem[] = [
  {
    id: 1,
    userId: "user123",
    productId: 1,
    addedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: "user123",
    productId: 4,
    addedAt: new Date().toISOString(),
  },
  {
    id: 3,
    userId: "user123",
    productId: 5,
    addedAt: new Date().toISOString(),
  },
]

// Get all wishlist items for a user
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const userWishlist = wishlistItems.filter((item) => item.userId === userId)

  return NextResponse.json({ items: userWishlist })
}

// Add an item to the wishlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId } = body

    if (!userId || !productId) {
      return NextResponse.json({ error: "User ID and Product ID are required" }, { status: 400 })
    }

    // Check if item already exists in wishlist
    const existingItem = wishlistItems.find((item) => item.userId === userId && item.productId === productId)

    if (existingItem) {
      return NextResponse.json({ message: "Item already in wishlist" }, { status: 200 })
    }

    // Add new item to wishlist
    const newItem: WishlistItem = {
      id: wishlistItems.length + 1,
      userId,
      productId,
      addedAt: new Date().toISOString(),
    }

    wishlistItems.push(newItem)

    return NextResponse.json({ message: "Item added to wishlist", item: newItem }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add item to wishlist" }, { status: 500 })
  }
}

// Remove an item from the wishlist
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 })
  }

  const initialLength = wishlistItems.length
  wishlistItems = wishlistItems.filter((item) => item.id !== Number.parseInt(id))

  if (wishlistItems.length === initialLength) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "Item removed from wishlist" })
}

interface WishlistItem {
  id: number
  userId: string
  productId: number
  addedAt: string
}
