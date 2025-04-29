import { NextResponse } from "next/server"

// Define the Review type
interface Review {
  id: number
  content: string
  rating: number
  author: string
}

// Mock database (replace with actual database logic)
let reviews: Review[] = [
  { id: 1, content: "Great product!", rating: 5, author: "John Doe" },
  { id: 2, content: "Not bad, but could be better.", rating: 3, author: "Jane Smith" },
]

// GET: Fetch all reviews
export async function GET() {
  return NextResponse.json(reviews)
}

// POST: Add a new review
export async function POST(req: Request) {
  const body = await req.json()

  // Validate the request body
  if (!body.content || !body.rating || !body.author) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const newReview: Review = {
    id: reviews.length + 1,
    content: body.content,
    rating: body.rating,
    author: body.author,
  }

  reviews.push(newReview)
  return NextResponse.json(newReview, { status: 201 })
}

// PUT: Update an existing review
export async function PUT(req: Request) {
  const body = await req.json()

  // Validate the request body
  if (!body.id || !body.content || !body.rating || !body.author) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const reviewIndex = reviews.findIndex((review) => review.id === body.id)
  if (reviewIndex === -1) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 })
  }

  reviews[reviewIndex] = { ...reviews[reviewIndex], ...body }
  return NextResponse.json(reviews[reviewIndex])
}

// DELETE: Remove a review
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get("id") || "")

  if (!id) {
    return NextResponse.json({ error: "Missing review ID" }, { status: 400 })
  }

  const reviewIndex = reviews.findIndex((review) => review.id === id)
  if (reviewIndex === -1) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 })
  }

  const deletedReview = reviews.splice(reviewIndex, 1)
  return NextResponse.json(deletedReview[0])
}