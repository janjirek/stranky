import Testimonial from '@/components/testimonial.tsx';
import type { Testemonial } from 'src/utils/types';

interface TestimonialsProps {
  testimonials: Testemonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const testimonials01 = testimonials.slice(0, testimonials.length / 2);
  const testimonials02 = testimonials.slice(testimonials.length / 2);

  return (
    <section className="relative mx-auto max-w-7xl">
      <div
        className="pointer-events-none absolute inset-0 -z-10 mb-24 rounded-tr-[100px] bg-gray-900 md:mb-10"
        aria-hidden="true"
      />
      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="font-cabinet-grotesk text-4xl font-bold text-zinc-200 md:text-5xl">
              Co o mně říkají moji klienti
            </h2>
          </div>
        </div>
        <div className="mx-auto max-w-[94rem] space-y-6">
          {/* Row #1 */}
          <div className="group inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)]">
            <div className="flex animate-infinite-scroll items-start justify-center group-hover:[animation-play-state:paused] md:justify-start [&>div]:mx-3">
              {/* Items */}
              {testimonials01.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  testimonial={{
                    fullname: testimonial.data.fullname,
                  }}
                >
                  {testimonial.data.content}
                </Testimonial>
              ))}
            </div>
            {/* Duplicated element for infinite scroll */}
            <div
              className="flex animate-infinite-scroll items-start justify-center group-hover:[animation-play-state:paused] md:justify-start [&>div]:mx-3"
              aria-hidden="true"
            >
              {/* Items */}
              {testimonials01.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  testimonial={{
                    fullname: testimonial.data.fullname,
                  }}
                >
                  {testimonial.data.content}
                </Testimonial>
              ))}
            </div>
          </div>
          {/* Row #2 */}
          <div className="group inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)]">
            <div className="flex animate-infinite-scroll-inverse items-start justify-center [animation-delay:-7.5s] group-hover:[animation-play-state:paused] md:justify-start [&>div]:mx-3">
              {/* Items */}
              {testimonials02.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  testimonial={{
                    fullname: testimonial.data.fullname,
                  }}
                >
                  {testimonial.data.content}
                </Testimonial>
              ))}
            </div>
            {/* Duplicated element for infinite scroll */}
            <div
              className="flex animate-infinite-scroll-inverse items-start justify-center [animation-delay:-7.5s] group-hover:[animation-play-state:paused] md:justify-start [&>div]:mx-3"
              aria-hidden="true"
            >
              {/* Items */}
              {testimonials02.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  testimonial={{
                    fullname: testimonial.data.fullname,
                  }}
                >
                  {testimonial.data.content}
                </Testimonial>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
