import { useNavigate, useLocation } from 'react-router-dom'
import { Shirt, ClipboardCheck, ArrowLeftRight } from 'lucide-react'
import { useStore } from '@/store'
import { cn } from '@/lib/utils'

export default function Header() {
  const { role, setRole } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-vintage-cream/95 backdrop-blur-sm border-b border-vintage-border">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 group"
        >
          <Shirt className="w-6 h-6 text-vintage-gold group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-display text-lg text-vintage-brown tracking-wide">
            古着衣橱
          </span>
        </button>

        <nav className="flex items-center gap-3">
          {role === 'customer' && (
            <button
              onClick={() => navigate('/')}
              className={cn(
                'px-3 py-1.5 text-xs rounded-sm transition-colors',
                location.pathname === '/'
                  ? 'bg-vintage-brown text-vintage-cream'
                  : 'text-vintage-brown hover:bg-vintage-tan/20'
              )}
            >
              浏览
            </button>
          )}
          {role === 'staff' && (
            <button
              onClick={() => navigate('/returns')}
              className={cn(
                'px-3 py-1.5 text-xs rounded-sm transition-colors',
                location.pathname === '/returns'
                  ? 'bg-vintage-brown text-vintage-cream'
                  : 'text-vintage-brown hover:bg-vintage-tan/20'
              )}
            >
              归还检查
            </button>
          )}

          <button
            onClick={() => {
              const newRole = role === 'customer' ? 'staff' : 'customer'
              setRole(newRole)
              if (newRole === 'staff') {
                navigate('/returns')
              } else {
                navigate('/')
              }
            }}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-sm border transition-all duration-300',
              role === 'customer'
                ? 'border-vintage-brown/30 text-vintage-brown hover:bg-vintage-brown hover:text-vintage-cream'
                : 'border-vintage-crimson/30 text-vintage-crimson hover:bg-vintage-crimson hover:text-white'
            )}
          >
            <ArrowLeftRight className="w-3 h-3" />
            {role === 'customer' ? (
              <>
                <Shirt className="w-3 h-3" />
                顾客
              </>
            ) : (
              <>
                <ClipboardCheck className="w-3 h-3" />
                店员
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
