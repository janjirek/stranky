import { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  href: string;
  label: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
}

export default function Dropdown({ label, items, className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        // ZMĚNA: hover:text-blue-600 (místo gray-900)
        className="flex items-center text-gray-700 transition hover:text-blue-600 cursor-pointer font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-48 rounded-xl bg-white shadow-xl border border-gray-100 py-2 overflow-hidden">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              // ZMĚNA: Modré podbarvení a text při najetí, font-medium
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}