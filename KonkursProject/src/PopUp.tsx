import React, { useState } from "react";

interface FormData {
    name: string;
    email: string;
    phone: string;
    participants: string;
    extraParticipants: string;
    message: string;
    lunch: boolean;
    notifications: boolean;
}

interface SignupPopupProps {
    onClose: () => void;
}

const SignupPopup: React.FC<SignupPopupProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        participants: "",
        extraParticipants: "",
        message: "",
        lunch: false,
        notifications: false,
    });



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target;
        const { name, value } = target;

        setFormData((prev) => ({
            ...prev,
            [name]: target.type === "checkbox"
                ? (target as HTMLInputElement).checked
                : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Отправка формы:", formData);
        // Здесь можно добавить отправку на сервер
        onClose(); // Закрыть по отправке
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative shadow-xl border border-black">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-black text-2xl font-bold hover:scale-110 transition"
                >
                    ×
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
                    <div>
                        <label className="text-sm">Имя</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm">Почта</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 shadow-sm"
                            type="email"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm">Телефон</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm">Количество участников</label>
                        <input
                            name="participants"
                            value={formData.participants}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Количество участников</label>
                        <input
                            name="extraParticipants"
                            value={formData.extraParticipants}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Пожелания или вопросы</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 shadow-sm h-24 resize-none"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="lunch"
                            checked={formData.lunch}
                            onChange={handleChange}
                        />
                        <label className="text-sm">Возможность получения обеда</label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={formData.notifications}
                            onChange={handleChange}
                        />
                        <label className="text-sm">
                            Хотите получать уведомления о новых мероприятиях?
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold py-2 rounded-full hover:opacity-90"
                    >
                        Записаться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPopup;
