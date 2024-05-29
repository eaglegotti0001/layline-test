import bgCover from '@assets/images/landing/intro.webp';
import logoTransparent from '@assets/images/landing/logo-transparent.webp';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function SectionHome() {
  const { ref: magicSectionRef, inView: visible } = useInView();

  return (
    <div className={`relative h-[720px] w-full`}>
      <Image src={bgCover} className="h-full w-full" style={{ width: '100%', height: '720px', objectFit: 'cover' }} alt="" />

      <div className={`absolute left-0 right-0 bottom-0 top-0 bg-[#02132D] transition-all duration-1000 ${visible ? 'bg-opacity-0' : 'bg-opacity-30'}`}>
        <div ref={magicSectionRef} className={`container mx-auto px-6 py-[20px] md:pt-[100px] md:pb-[200px] flex flex-col items-center justify-center`}>
          <Image src={logoTransparent} className="mb-10" alt="" />

          <div className="py-8 px-16 w-[70%] bg-yellow-200/25 rounded-[20px] text-center">
            <span className={`transition-all delay-100 duration-300 ${visible ? 'ml-[0px] opacity-100' : '-ml-[30px] opacity-0'} text-lg text-gray-200 md:text-xl mb-8`}>
              Times are changing. <br />
              LeyLine is a platform created by professionals, for professionals, to better cope with the evolving creative landscape.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
