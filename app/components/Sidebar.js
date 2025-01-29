'use client'
import Link from 'next/link'
import { BarChart2, BookOpen, Briefcase } from 'lucide-react'

const menuItems = [
  {
    icon: BarChart2,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: BookOpen,
    label: 'Skill Test',
    href: '/',
    active: true,
  },
  {
    icon: Briefcase,
    label: 'Internship',
    href: '/',
  },
]

export default function Sidebar() {
  return (
    <div className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r">
      <div className="flex flex-col p-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}