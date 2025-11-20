import { useMemo } from 'react'

export default function CartDrawer({ open, items, onClose, onCheckout }) {
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.quantity, 0), [items])
  const tax = useMemo(() => +(subtotal * 0.08).toFixed(2), [subtotal])
  const total = useMemo(() => +(subtotal + tax).toFixed(2), [subtotal, tax])

  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Your Cart</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <p className="text-slate-500">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center justify-between gap-3 border rounded-lg p-3">
                <div>
                  <p className="font-medium text-slate-800">{it.title}</p>
                  <p className="text-sm text-slate-500">${it.price.toFixed(2)} × {it.quantity}</p>
                </div>
                <p className="font-semibold text-slate-900">${(it.price * it.quantity).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full mt-2 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
