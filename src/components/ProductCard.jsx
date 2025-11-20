export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      {product.image && (
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-slate-800">{product.title}</h3>
        {product.description && (
          <p className="text-sm text-slate-500 line-clamp-2 mt-1">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-slate-900">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!product.in_stock}
          >
            {product.in_stock ? 'Add to cart' : 'Out of stock'}
          </button>
        </div>
      </div>
    </div>
  )
}
