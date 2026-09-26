/*
# Create John Major guest orders

1. New Tables
- `john_major_orders`
- `id` (uuid, generated primary key)
- `order_number` (text, unique customer-facing order number)
- `customer` (jsonb, checkout contact and delivery fields)
- `items` (jsonb, ordered product snapshots and quantities)
- `total` (numeric, business total in Nigerian naira)
- `payment_status` (text, starts as Awaiting Payment)
- `order_status` (text, starts as New Order)
- `created_at` (timestamp)

2. Security
- Row level security is enabled.
- Anonymous customers may create orders for guest checkout.
- Anonymous customers cannot browse existing orders.
- Authenticated roles retain the same explicit deny-by-default read/write behavior until an admin workflow is added.

3. Important Notes
- Bank-transfer orders are never marked paid by this table.
- Product details are stored as a snapshot so an order remains understandable if catalog records change later.
*/

CREATE TABLE IF NOT EXISTS public.john_major_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer jsonb NOT NULL,
  items jsonb NOT NULL,
  total numeric(12,2) NOT NULL CHECK (total >= 0),
  payment_status text NOT NULL DEFAULT 'Awaiting Payment',
  order_status text NOT NULL DEFAULT 'New Order',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.john_major_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "guest_can_create_john_major_orders" ON public.john_major_orders;
CREATE POLICY "guest_can_create_john_major_orders"
ON public.john_major_orders FOR INSERT
TO anon, authenticated
WITH CHECK (
  payment_status = 'Awaiting Payment'
  AND order_status = 'New Order'
  AND total >= 0
);

DROP POLICY IF EXISTS "orders_are_not_publicly_readable" ON public.john_major_orders;
CREATE POLICY "orders_are_not_publicly_readable"
ON public.john_major_orders FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "orders_are_not_publicly_updatable" ON public.john_major_orders;
CREATE POLICY "orders_are_not_publicly_updatable"
ON public.john_major_orders FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "orders_are_not_publicly_deletable" ON public.john_major_orders;
CREATE POLICY "orders_are_not_publicly_deletable"
ON public.john_major_orders FOR DELETE
TO anon, authenticated
USING (false);
