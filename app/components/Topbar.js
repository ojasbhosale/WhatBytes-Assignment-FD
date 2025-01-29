'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useMenu } from '../context/MenuContext'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/',
  },
  {
    label: 'Skill Test',
    href: '/',
    active: true,
  },
  {
    label: 'Internship',
    href: '/',
  },
]

export default function Topbar() {
  const { isMenuOpen, toggleMenu } = useMenu()

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="font-bold text-xl tracking-tight">WhatBytes</div>
          </Link>

          {/* Desktop Profile */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm font-medium">Rahil Siddique</span>
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/images/profile.png"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white md:hidden">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 p-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">Rahil Siddique</span>
            </div>
          </div>
          <nav className="p-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center px-2 py-3 rounded-lg text-sm font-medium ${
                  item.active
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}