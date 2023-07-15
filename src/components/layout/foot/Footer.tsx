import Link from 'next/link'

export default function Footer() {
  const year = new Date()
  return (
    <footer className="border-t border-secondary/60 mt-auto py-4 text-slate-500">
      <div className="flex justify-between mx-4 md:mx-7 lg:mx-10 gap-6">
        <p>© {year.getFullYear()} Gino Naumann</p>
        <Link className="text-right" href="/imprint">
          Impressum & Datenschutz
        </Link>
      </div>
    </footer>
  )
}
