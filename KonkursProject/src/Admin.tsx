import { useState } from "react";

export default function Admin() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMessage("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setMessage("Выберите изображение для загрузки.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("https://d241tyj0czct.share.zrok.io/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Загружено:", result);
            setMessage("Файл успешно загружен!");
            setFile(null);
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            setMessage("Ошибка при загрузке файла.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow flex flex-col gap-4 border border-gray-200">
            <h2 className="text-xl font-semibold">Загрузка изображения</h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
            />

            {file && <p className="text-sm text-gray-600">Выбран: {file.name}</p>}

            <button
                type="submit"
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded disabled:opacity-50"
            >
                {uploading ? "Загрузка..." : "Загрузить"}
            </button>

            {message && <p className="text-sm text-center text-gray-700">{message}</p>}
        </form>
    );
}
