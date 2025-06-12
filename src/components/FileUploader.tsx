import { useMarkdownStore } from '../store/useMarkdownStore';

export const FileUploader = () => {
    const addFile = useMarkdownStore((state) => state.addFile);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !file.name.endsWith('.md')) return;

        const reader = new FileReader();
        reader.onload = () => {
        if (typeof reader.result === 'string') {
            const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

            addFile({
                id,
                name: file.name,
                content: reader.result,
                uploadedAt: Date.now(),
            });
        }
        };
        reader.readAsText(file);
    };

    return (
        <div className="p-4">
        <label className="block mb-2 font-semibold text-gray-700">📁 마크다운 업로드</label>
        <input
            type="file"
            accept=".md"
            onChange={handleFileChange}
            className="file:bg-blue-100 file:text-blue-800 file:rounded file:px-4 file:py-2"
        />
        </div>
    );
};
