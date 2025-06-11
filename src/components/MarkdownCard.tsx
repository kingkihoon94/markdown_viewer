import ReactMarkdown from 'react-markdown';

type Props = {
  name: string;
  content: string;
};

export const MarkdownCard = ({ name, content }: Props) => {
  return (
    <div className="border rounded-lg p-4 shadow bg-white w-full max-w-md">
      <h3 className="text-lg font-bold mb-3">{name}</h3>
      <div className="prose prose-sm text-gray-800 line-clamp-[12] overflow-hidden">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};
