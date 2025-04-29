export interface EmailOptions {
  to: string
  subject: string
  templateId?: string
  data?: Record<string, any>
}

/**
 * Send an email using the configured email service
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  console.log(`Sending email to ${options.to} with subject: ${options.subject}`)
  console.log("Email data:", options.data)

  // In a real app, this would call an email service API
  // For example, with SendGrid:
  // return sendgrid.send({
  //   to: options.to,
  //   from: 'noreply@luxe.com',
  //   templateId: options.templateId,
  //   dynamicTemplateData: options.data
  // })

  // Simulate successful email sending
  return Promise.resolve(true)
}

/**
 * Send an order confirmation email
 */
export async function sendOrderConfirmationEmail(
  email: string,
  orderData: {
    orderNumber: string
    items: Array<{ name: string; quantity: number; price: number }>
    total: number
    shippingAddress: string
  },
): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: `Order Confirmation #${orderData.orderNumber}`,
    templateId: "order-confirmation",
    data: {
      orderNumber: orderData.orderNumber,
      items: orderData.items,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      estimatedDelivery: getEstimatedDeliveryDate(),
    },
  })
}

/**
 * Send a shipping confirmation email
 */
export async function sendShippingConfirmationEmail(
  email: string,
  shippingData: {
    orderNumber: string
    trackingNumber: string
    carrier: string
    estimatedDelivery: string
  },
): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: `Your Order #${shippingData.orderNumber} Has Shipped`,
    templateId: "shipping-confirmation",
    data: {
      orderNumber: shippingData.orderNumber,
      trackingNumber: shippingData.trackingNumber,
      carrier: shippingData.carrier,
      trackingUrl: getTrackingUrl(shippingData.carrier, shippingData.trackingNumber),
      estimatedDelivery: shippingData.estimatedDelivery,
    },
  })
}

/**
 * Send a welcome email to new users
 */
export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: "Welcome to LUXE",
    templateId: "welcome-email",
    data: {
      name,
      recommendedProducts: getRecommendedProducts(),
    },
  })
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(email: string, resetToken: string): Promise<boolean> {
  const resetUrl = `https://luxe.com/reset-password?token=${resetToken}`

  return sendEmail({
    to: email,
    subject: "Reset Your Password",
    templateId: "password-reset",
    data: {
      resetUrl,
      expiresIn: "1 hour",
    },
  })
}

/**
 * Send an abandoned cart reminder email
 */
export async function sendAbandonedCartEmail(
  email: string,
  cartData: {
    items: Array<{ name: string; quantity: number; price: number; image: string }>
    total: number
  },
): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: "Complete Your Purchase at LUXE",
    templateId: "abandoned-cart",
    data: {
      items: cartData.items,
      total: cartData.total,
      cartUrl: "https://luxe.com/cart",
    },
  })
}

// Helper functions

function getEstimatedDeliveryDate(): string {
  const date = new Date()
  date.setDate(date.getDate() + 5) // Estimate 5 days for delivery
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

function getTrackingUrl(carrier: string, trackingNumber: string): string {
  // Return tracking URLs based on carrier
  switch (carrier.toLowerCase()) {
    case "ups":
      return `https://www.ups.com/track?tracknum=${trackingNumber}`
    case "fedex":
      return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingNumber}`
    case "usps":
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`
    case "dhl":
      return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`
    default:
      return `https://luxe.com/orders/track?number=${trackingNumber}`
  }
}

function getRecommendedProducts() {
  // In a real app, this would fetch personalized product recommendations
  return [
    {
      id: 1,
      name: "Artisan Leather Bag",
      price: 1299,
      image: "https://luxe.com/images/products/leather-bag.jpg",
      url: "https://luxe.com/products/1",
    },
    {
      id: 2,
      name: "Precision Chronograph",
      price: 2499,
      image: "https://luxe.com/images/products/chronograph.jpg",
      url: "https://luxe.com/products/2",
    },
  ]
}
