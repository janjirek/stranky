import useMasonry from '../utils/useMasonry.tsx';
import TestimonialDetail from './testimonialDetail.tsx';
import type { Testemonial } from 'src/utils/types';

interface ReferencesProps {
  testimonials: Testemonial[];
}

export default function References({ testimonials }: ReferencesProps) {
  const masonryContainer = useMasonry();

  // Generate random rotation between -2 and 2 degrees for each testimonial
  const getRandomRotation = () => {
    return Math.random() * 4 - 2; // Random number between -2 and 2
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Testimonials grid */}
          <div
            ref={masonryContainer}
            className="grid items-start gap-4 sm:grid-cols-3 md:gap-6 bg-zinc-600 p-8 rounded-lg"
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <TestimonialDetail
                  testimonial={{
                    fullname: testimonial.data.fullname,
                  }}
                  className="w-full"
                  rotation={getRandomRotation()}
                >
                  {testimonial.data.content}
                </TestimonialDetail>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
