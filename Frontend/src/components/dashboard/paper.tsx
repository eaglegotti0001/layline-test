'use client';

type Prop = {
  title: string;
};

export default function Paper({ title }: Prop) {
  return (
    <div className="flex flex-col w-full h-full border border-gray-300 shadow-lg bg-white rounded overflow-hidden">
      <div className="flex h-12 w-full bg-green-600 items-center px-4 py-2 text-white">{title}</div>
      <div className="w-full h-full bg-white"></div>
    </div>
  );
}
