import { ISectionTitleProps } from "./SectionTitle";

export default function Title({ content, className }: ISectionTitleProps) {
  return (
    <h3 className={`text-2xl font-bold mb-6 w-full text-white ${className}`}>
      {content}
    </h3>
  );
}
