import { useInView } from 'react-intersection-observer';

export default function SectionAbout() {
  const { ref: magicSectionRef, inView: visible } = useInView();

  return (
    <div className="relative flex flex-col w-full pt-[20px] bg-white">
      <div className="absolute left-0 right-0 -top-[36px] shape overflow-hidden h-10 flex items-end">
        <svg viewBox="0 0 2880 48" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="white"></path>
        </svg>
      </div>

      <div ref={magicSectionRef} className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex flex-col w-[60%] mb-4 py-16">
          <span className="text-center text-xl">We empower creative teams with robust cloud infrastructure, powerful organizational tools, and AIs that work for you instead of against you.</span>
        </div>
      </div>
    </div>
  );
}
