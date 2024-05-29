type Props = {
  text: string;
};
export default function Title({ text }: Props) {
  return <span className="mx-4 text-2xl font-black text-gray-800 md:text-4xl">{text.toUpperCase()}</span>;
}
