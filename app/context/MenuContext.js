'use client'
import { createContext, useContext, useState } from 'react'

const MenuContext = createContext({
  isMenuOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
})

export function MenuProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)