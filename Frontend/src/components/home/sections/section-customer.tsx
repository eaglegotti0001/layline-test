import img3d from '@assets/images/landing/3d.webp';
import imgAI from '@assets/images/landing/AI.webp';
import imgJobs from '@assets/images/landing/jobs.webp';
import imgKey from '@assets/images/landing/keyframe.webp';
import img from '@assets/images/landing/producer-tool.webp';
import Image from 'next/image';
import ScrollSection from './scroll-section';

export default function SectionCustomer() {
  return (
    <ScrollSection id="customers-section">
      <div className="transition-all duration-300 flex w-full flex-wrap cursor-pointer hover:scale-105 rounded-tl-[30px] rounded-br-[30px] overflow-hidden mb-16">
        <div className="w-full lg:w-1/4">
          <Image src={img} alt="" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
        </div>

        <div className="flex w-full lg:w-3/4 items-center bg-gradient">
          <div className="p-8 text-right">
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white">Producer Tool</h2>

            <div className="py-5 text-xl text-gray-500 lg:text-xl  dark:text-gray-300 !leading-10">
              Give your production the best shot that money can buy.
              <br />
              Try our light yet powerful cloud pipeline that brings management efficiency to a new level and adds a full range of professional AI tools into your workflow. Try it now for FREE. Slash your budget by 40%+.
            </div>
          </div>
        </div>
      </div>

      <div className="transition-all duration-300 flex w-full flex-wrap cursor-pointer hover:scale-105 rounded-tl-[30px] rounded-br-[30px] overflow-hidden mb-16">
        <div className="flex w-full lg:w-3/4 items-center bg-gradient">
          <div className="max-w-4xl p-8">
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white">Jobs</h2>
            <div className="py-5 text-xl text-gray-500 lg:text-xl  dark:text-gray-300 !leading-10">
              A global community of artists and studios collaborating in an open and safe environment.
              <br />
              Work anywhere you like with guaranteed payment and verified work opportunities.
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4">
          <Image src={imgJobs} alt="" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      <div className="transition-all duration-300 flex flex-row w-full cursor-pointer hover:scale-105 rounded-tl-[30px] rounded-br-[30px] overflow-hidden">
        <div className="w-full lg:w-1/2">
          <Image style={{ height: '100%', width: 'auto', objectFit: 'cover' }} src={imgAI} alt="" />
        </div>

        <div className="flex w-full lg:w-1/2 items-center bg-gradient-to-b from-yellow-100/50">
          <div className="p-8">
            <h2 className="text-2xl text-right font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white">AI</h2>
            <div className="py-5 text-md text-gray-500 lg:text-lg dark:text-gray-300 !leading-10">
              <p className="text-right">
                We provide AI APIs that are custom built for professional workflows.
                <br />
                Our AIs don’t replace artists.
                <br />
                They make your life easier by replacing that 80% of non creative work in the creative process.
                <br />
                You always remain in creative control.
              </p>

              <div className="flex justify-end mt-8">
                <div className="flex-1 text-center">
                  <Image src={img3d} alt="" />
                </div>
                <div className="flex-1 text-center">
                  <Image src={imgKey} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
