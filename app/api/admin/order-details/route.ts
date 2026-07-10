// app/api/admin/order-details/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from "@/app/lib/db";

// Type for order detail from your table
type OrderDetailRow = {
  id: number;
  order_id: number;
  service_name: string;
  qty: number;
  price: number;
  retouching: string | null;
  order_name: string;
  order_images: string | null;
  order_details: string | null;
  addons: string | null;
  status: string;
  comment: string | null;
  extra_options: string | null;
  declutterType: string | null;
  color: string | null;
  detailing: string | null;
  status_comment: string | null;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('order_id');
    
    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Query your orders table - replace 'orders' with your actual table name
    const orderDetails = await query(
      `SELECT 
        id,
        order_id,
        service_name,
        qty,
        price,
        retouching,
        order_name,
        order_images,
        order_details,
        addons,
        status,
        comment,
        extra_options,
        declutterType,
        color,
        detailing,
        status_comment
      FROM order_items 
      WHERE order_id = ?`,
      [parseInt(orderId)]
    ) as OrderDetailRow[];

    return NextResponse.json({
      success: true,
      orderDetails: orderDetails,
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order details' },
      { status: 500 }
    );
  }
}