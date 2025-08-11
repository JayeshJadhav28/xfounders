{/*import Link from "next/link"

export type ExploreItem = {
  id: string
  title: string
  summary: string
  date?: string
  sourceUrl?: string
  tag?: string
}

export default function CategoryGrid({ title, items }: { title?: string; items: ExploreItem[] }) {
  return (
    <section className="container-custom py-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <article key={item.id} className="card p-6 flex flex-col justify-between">
            <div>
              {item.tag && (
                <span className="inline-block mb-3 text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded">
                  {item.tag}
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.summary}</p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{item.date}</span>
              {item.sourceUrl ? (
                <Link
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline"
                >
                  Read more →
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
*/}
