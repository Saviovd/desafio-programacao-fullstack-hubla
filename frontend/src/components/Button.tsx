interface IButtonProps {
  content: string;
  action: (e: { preventDefault: () => void }) => Promise<void>;
}
export default function Button({ content, action }: IButtonProps) {
  return (
    <button
      onClick={action}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium 
      ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-50 text-zinc-900 hover:bg-zinc-200 
      h-10 px-4 py-2 w-full"
    >
      {content}
    </button>
  );
}
