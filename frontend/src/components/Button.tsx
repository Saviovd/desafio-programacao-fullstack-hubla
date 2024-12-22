interface IButtonProps {
  content: string;
  action: (e: { preventDefault: () => void }) => Promise<void>;
  disabled?: boolean | undefined;
  className?: string;
}
export default function Button({
  content,
  action,
  disabled,
  className,
}: IButtonProps) {
  return (
    <button
      onClick={action}
      className={`items-center justify-center whitespace-nowrap rounded-md text-sm font-medium 
      ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 bg-zinc-50 text-zinc-900 hover:bg-zinc-200 
      h-10 px-4 py-2${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-lime-500"
      } ${className}`}
    >
      {content}
    </button>
  );
}
