import { useState } from 'react';

interface ContractData {
  title: string;
  description: string;
  slug: string;
  youtube_link?: string;
  thumbnail: string;
  location: string;
}

interface ContractPost {
  id: string;
  data: ContractData;
  thumbnail_url: string; // URL připravené Cloudinary helperem
}

interface ContractsCatalogueProps {
  contracts: ContractPost[];
  postsPerPage?: number;
}

export default function ContractsCatalogue({
  contracts,
  postsPerPage = 3,
}: ContractsCatalogueProps) {
  const [visiblePosts, setVisiblePosts] = useState(postsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + postsPerPage, contracts.length));
      setIsLoading(false);
    }, 500);
  };

  const hasMorePosts = visiblePosts < contracts.length;

  return (
    <div className="mb-8">
      {contracts.slice(0, visiblePosts).map((post, postIndex) => (
        // NOVÁ ČISTÁ KARTA
        <article
          key={post.id}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-8 border border-slate-100 dark:border-slate-700"
        >
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* OBRÁZEK (Thumbnail) */}
            <div className="relative md:w-1/3 shrink-0 aspect-video md:aspect-[4/3] overflow-hidden rounded-xl">
                {/* Zde by bylo dobré použít CldImage pro optimalizaci, ale v TSX je to složitější, 
                    proto používáme hotovou URL z props */}
                <img 
                  src={post.thumbnail_url} 
                  alt={post.data.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]" 
                />
            </div>

            {/* TEXTOVÝ OBSAH */}
            <div className="flex flex-col flex-grow pt-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {/* OPRAVENÝ ODKAZ NA /zakazky/SLUG */}
                <a href={`/zakazky/${post.data.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.data.title}
                </a>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{post.data.description}</p>
              
              {/* Footer / CTA */}
              <footer className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                <a
                  href={`/zakazky/${post.data.slug}`}
                  className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 flex items-center gap-1"
                >
                  Zobrazit případovou studii
                  <span className="tracking-normal text-blue-300 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">→</span>
                </a>
              </footer>
            </div>
          </div>
        </article>
      ))}

      {/* Load more button */}
      {hasMorePosts && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="btn-sm min-w-[220px] bg-gray-800 py-2.5 text-gray-200 shadow-sm hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Načítání...
              </>
            ) : (
              <>
                Načíst další
                <span className="ml-2 tracking-normal text-gray-500">↓</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}