import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/products`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAdd = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p))
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }]
    })
  }

  const cartCount = useMemo(() => cart.reduce((n, it) => n + it.quantity, 0), [cart])

  const doCheckout = async () => {
    try {
      const payload = {
        customer_name: 'Walk-in Customer',
        customer_email: 'customer@example.com',
        customer_address: '123 Main St',
        items: cart.map((c) => ({ product_id: c.id, quantity: c.quantity })),
      }
      const res = await fetch(`${baseUrl}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      alert(`Order placed! Total $${data.total}\nOrder ID: ${data.order_id}`)
      setCart([])
      setOpen(false)
    } catch (e) {
      alert(e.message)
    }
  }

  const seed = async () => {
    try {
      await fetch(`${baseUrl}/seed`, { method: 'POST' })
      await fetchProducts()
    } catch {}
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cartCount} onCheckout={() => setOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <button onClick={seed} className="text-sm text-slate-600 hover:text-slate-900">Seed sample products</button>
        </div>

        {loading && <p className="text-slate-600">Loading products...</p>}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded p-3 mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </main>

      <CartDrawer open={open} items={cart} onClose={() => setOpen(false)} onCheckout={doCheckout} />
    </div>
  )
}

export default App
