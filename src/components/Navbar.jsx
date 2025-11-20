import { ShoppingCart } from 'lucide-react'

export default function Navbar({ cartCount, onCheckout }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <span className="font-bold text-slate-800 text-lg">Your Shop</span>
        </div>
        <button
          onClick={onCheckout}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
