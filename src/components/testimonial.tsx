interface TestimonialProps {
  testimonial: {
    fullname: string;
  };
  children: React.ReactNode;
  className?: string;
}

export default function Testimonial({ testimonial, children }: TestimonialProps) {
  return (
    <div className="h-full w-[22rem] rounded-sm border border-transparent p-5 [background:linear-gradient(#1f2937,#1f2937)_padding-box,linear-gradient(120deg,var(--color-zinc-700),--theme(--color-zinc-700/0),var(--color-zinc-700))_border-box]">
      <div className="mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <div>
          <div className="font-inter-tight font-bold text-zinc-200">{testimonial.fullname}</div>
        </div>
      </div>
      <div className="text-zinc-500 before:content-['\0022'] after:content-['\0022']">
        {children}
      </div>
    </div>
  );
}
