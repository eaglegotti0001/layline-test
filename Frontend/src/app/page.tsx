'use client';
import SectionAbout from '@/components/home/sections/section-about';
import SectionCustomer from '@/components/home/sections/section-customer';
import SectionHome from '@/components/home/sections/section-home';

export default function Dashboard() {
  return (
    <main>
      <SectionHome />
      <SectionAbout />
      <SectionCustomer />
    </main>
  );
}
