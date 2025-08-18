import { useState } from 'react';

interface ContractPost {
  id: string;
  data: {
    title: string;
    description: string;
    slug: string;
    youtube_link?: string;
    thumbnail: string;
    location: string;
  };
  thumbnail_url: string;
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
        <article
          key={post.id}
          className="space-y-10 border-l [border-image:linear-gradient(to_bottom,var(--color-slate-200),var(--color-slate-300),transparent)1] bg-slate-100 rounded-r-2xl p-6 mb-10"
        >
          <div className="relative mb-2 flex flex-col md:flex-row items-center md:items-start gap-4">
            <img src={post.thumbnail_url} alt={post.data.title} className="md:w-1/3 rounded-lg" />
            <div className="flex flex-col gap-2">
              <header className="mb-2">
                <h2 className="text-2xl font-bold">
                  <a href={post.data.slug} className="hover:underline">
                    {post.data.title}
                  </a>
                </h2>
              </header>
              <p className="mb-4 text-gray-700">{post.data.description}</p>
              <footer>
                <a
                  className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
                  href={post.data.slug}
                >
                  Číst více <span className="tracking-normal text-blue-300">-&gt;</span>
                </a>
              </footer>
            </div>
          </div>
        </article>
      ))}

      {/* Load more button */}
      {hasMorePosts && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="btn-sm min-w-[220px] bg-gray-800 py-1.5 text-gray-200 shadow-sm hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
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
