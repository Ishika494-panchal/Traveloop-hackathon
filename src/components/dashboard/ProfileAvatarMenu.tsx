import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, User } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function ProfileAvatarMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <div ref={rootRef} className="relative ml-1">
      <motion.button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-traveloop-sky/35 bg-gradient-to-br from-traveloop-sky/40 to-traveloop-slate shadow-glow-sm ring-offset-2 ring-offset-[#0B0F1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traveloop-sky/50 md:h-11 md:w-11"
      >
        <span className="text-xs font-semibold text-white">AK</span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+10px)] z-[70] min-w-[180px] overflow-hidden rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/90 py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <Link
              to="/profile"
              role="menuitem"
              onClick={close}
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-traveloop-ice transition-colors hover:bg-traveloop-sky/15 hover:text-white"
            >
              <User className="h-4 w-4 text-traveloop-sky" strokeWidth={1.75} />
              Profile
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                close()
                navigate('/')
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-traveloop-ice/90 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <LogOut className="h-4 w-4 text-traveloop-steel" strokeWidth={1.75} />
              Logout
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
