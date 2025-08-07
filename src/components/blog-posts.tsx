import { useState } from 'react';

interface BlogPost {
  id: string;
  data: {
    author: string;
    title: string;
    description: string;
    slug: string;
    youtube_link?: string;
    thumbnail?: string;
  };
  thumbnail_url?: string;
}

interface BlogPostsProps {
  posts: BlogPost[];
  postsPerPage?: number;
}

export default function BlogPosts({ posts, postsPerPage = 3 }: BlogPostsProps) {
  const [visiblePosts, setVisiblePosts] = useState(postsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + postsPerPage, posts.length));
      setIsLoading(false);
    }, 500);
  };

  const hasMorePosts = visiblePosts < posts.length;

  return (
    <div className="mb-8">
      {posts.slice(0, visiblePosts).map((post, postIndex) => (
        <article
          key={post.id}
          className="space-y-10 border-l [border-image:linear-gradient(to_bottom,var(--color-slate-200),var(--color-slate-300),transparent)1] bg-slate-100 rounded-r-2xl p-6 mb-10"
        >
          <div className="relative mb-2 flex flex-col md:flex-row items-center md:items-start gap-4">
            {post.thumbnail_url ? (
              <img src={post.thumbnail_url} alt={post.data.title} className="w-1/3 rounded-lg" />
            ) : (
              <svg
                className="w-1/3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 782.04441 701.88002"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                role="img"
              >
                <path
                  d="M609.48783,100.59015l-25.44631,6.56209L270.53735,187.9987,245.091,194.56079A48.17927,48.17927,0,0,0,210.508,253.17865L320.849,681.05606a48.17924,48.17924,0,0,0,58.61776,34.58317l.06572-.01695,364.26536-93.93675.06572-.01695a48.17923,48.17923,0,0,0,34.58309-58.6178l-110.341-427.87741A48.17928,48.17928,0,0,0,609.48783,100.59015Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#f2f2f2"
                />
                <path
                  d="M612.94784,114.00532l-30.13945,7.77236L278.68955,200.20385l-30.139,7.77223a34.30949,34.30949,0,0,0-24.6275,41.74308l110.341,427.87741a34.30946,34.30946,0,0,0,41.7431,24.62736l.06572-.01695,364.26536-93.93674.06619-.01707a34.30935,34.30935,0,0,0,24.627-41.7429l-110.341-427.87741A34.30938,34.30938,0,0,0,612.94784,114.00532Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#fff"
                />
                <path
                  d="M590.19,252.56327,405.917,300.08359a8.01411,8.01411,0,0,1-4.00241-15.52046l184.273-47.52033A8.01412,8.01412,0,0,1,590.19,252.56327Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#f2f2f2"
                />
                <path
                  d="M628.955,270.49906,412.671,326.27437a8.01411,8.01411,0,1,1-4.00241-15.52046l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#f2f2f2"
                />
                <path
                  d="M620.45825,369.93676l-184.273,47.52032a8.01411,8.01411,0,1,1-4.00242-15.52046l184.273-47.52032a8.01411,8.01411,0,1,1,4.00241,15.52046Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#f2f2f2"
                />
                <path
                  d="M659.22329,387.87255l-216.284,55.77531a8.01411,8.01411,0,1,1-4.00242-15.52046l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#f2f2f2"
                />
                <path
                  d="M650.72653,487.31025l-184.273,47.52033a8.01412,8.01412,0,0,1-4.00242-15.52047l184.273-47.52032a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#f2f2f2"
                />
                <path
                  d="M689.49156,505.246l-216.284,55.77532a8.01412,8.01412,0,1,1-4.00241-15.52047l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#f2f2f2"
                />
                <path
                  d="M374.45884,348.80871l-65.21246,16.817a3.847,3.847,0,0,1-4.68062-2.76146L289.5963,304.81607a3.847,3.847,0,0,1,2.76145-4.68061l65.21247-16.817a3.847,3.847,0,0,1,4.68061,2.76145l14.96947,58.04817A3.847,3.847,0,0,1,374.45884,348.80871Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M404.72712,466.1822l-65.21247,16.817a3.847,3.847,0,0,1-4.68062-2.76146l-14.96946-58.04816A3.847,3.847,0,0,1,322.626,417.509l65.21246-16.817a3.847,3.847,0,0,1,4.68062,2.76145l14.96946,58.04817A3.847,3.847,0,0,1,404.72712,466.1822Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M434.99539,583.55569l-65.21246,16.817a3.847,3.847,0,0,1-4.68062-2.76145l-14.96946-58.04817a3.847,3.847,0,0,1,2.76145-4.68062l65.21247-16.817a3.847,3.847,0,0,1,4.68061,2.76146l14.96947,58.04816A3.847,3.847,0,0,1,434.99539,583.55569Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M863.63647,209.0517H487.31811a48.17928,48.17928,0,0,0-48.125,48.12512V699.05261a48.17924,48.17924,0,0,0,48.125,48.12507H863.63647a48.17924,48.17924,0,0,0,48.125-48.12507V257.17682A48.17928,48.17928,0,0,0,863.63647,209.0517Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M863.637,222.90589H487.31811a34.30948,34.30948,0,0,0-34.271,34.27093V699.05261a34.30947,34.30947,0,0,0,34.271,34.27088H863.637a34.30936,34.30936,0,0,0,34.27051-34.27088V257.17682A34.30937,34.30937,0,0,0,863.637,222.90589Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#fff"
                />
                <circle cx="694.19401" cy="614.02963" r="87.85039" fill="#007ef1" />
                <path
                  d="M945.18722,701.63087H914.63056V671.07421a11.45875,11.45875,0,0,0-22.9175,0v30.55666H861.1564a11.45875,11.45875,0,0,0,0,22.9175h30.55666V755.105a11.45875,11.45875,0,1,0,22.9175,0V724.54837h30.55666a11.45875,11.45875,0,0,0,0-22.9175Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#fff"
                />
                <path
                  d="M807.00068,465.71551H616.699a8.01412,8.01412,0,1,1,0-16.02823H807.00068a8.01412,8.01412,0,0,1,0,16.02823Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M840.05889,492.76314H616.699a8.01412,8.01412,0,1,1,0-16.02823H840.05889a8.01411,8.01411,0,1,1,0,16.02823Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M807.00068,586.929H616.699a8.01412,8.01412,0,1,1,0-16.02823H807.00068a8.01411,8.01411,0,0,1,0,16.02823Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M840.05889,613.97661H616.699a8.01412,8.01412,0,1,1,0-16.02823H840.05889a8.01412,8.01412,0,1,1,0,16.02823Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M574.07028,505.04162H506.72434a3.847,3.847,0,0,1-3.84278-3.84278V441.25158a3.847,3.847,0,0,1,3.84278-3.84278h67.34594a3.847,3.847,0,0,1,3.84278,3.84278v59.94726A3.847,3.847,0,0,1,574.07028,505.04162Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M574.07028,626.25509H506.72434a3.847,3.847,0,0,1-3.84278-3.84278V562.46505a3.847,3.847,0,0,1,3.84278-3.84278h67.34594a3.847,3.847,0,0,1,3.84278,3.84278v59.94726A3.847,3.847,0,0,1,574.07028,626.25509Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#e6e6e6"
                />
                <path
                  d="M807.21185,330.781H666.91017a8.01411,8.01411,0,0,1,0-16.02823H807.21185a8.01411,8.01411,0,0,1,0,16.02823Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#ccc"
                />
                <path
                  d="M840.27007,357.82862H666.91017a8.01411,8.01411,0,1,1,0-16.02822h173.3599a8.01411,8.01411,0,0,1,0,16.02822Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#ccc"
                />
                <path
                  d="M635.85911,390.6071H506.51316a3.847,3.847,0,0,1-3.84277-3.84277V285.81706a3.847,3.847,0,0,1,3.84277-3.84277H635.85911a3.847,3.847,0,0,1,3.84277,3.84277V386.76433A3.847,3.847,0,0,1,635.85911,390.6071Z"
                  transform="translate(-208.9778 -99.05999)"
                  fill="#007ef1"
                />
              </svg>
            )}
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
