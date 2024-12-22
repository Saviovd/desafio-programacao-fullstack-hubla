export interface ISectionTitleProps {
  content: string;
  className?: string;
}

export default function SectionTitle({ content }: ISectionTitleProps) {
  return <h2 className="text-4xl font-normal text-left w-full">{content}</h2>;
}
