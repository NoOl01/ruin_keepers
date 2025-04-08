import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {baseUrl} from "../BaseUrl.ts";
import AdminDashboard from "./AdminDashboard.tsx";

type Point = {
    name: string
    description: string
    number: number
    image?: File
}

export default function AdminCreateTour() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [place, setPlace] = useState("")
    const [price, setPrice] = useState(0)
    const [maxMembers, setMaxMembers] = useState(10)
    const [image, setImage] = useState<File | null>(null)

    const [points, setPoints] = useState<Point[]>([])
    const [startAt, setStartAt] = useState("")
    const [endAt, setEndAt] = useState("")
    const [guide, setGuide] = useState("")

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const handleAddPoint = () => {
        setPoints([...points, { name: "", description: "", number: points.length + 1 }])
    }

    const handleSubmit = async () => {
        try {
            // 1. Создание тура
            const tourRes = await axios.post(`${baseUrl}/api/v1/admin/tours/add`, {
                name,
                description,
                place,
                price,
                max_members: maxMembers,
                image: ""
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            const tourId = tourRes.data?.result?.id;
            console.log("TOUR ID:", tourId)
            if (!tourId) throw new Error("Tour ID is missing")

            // 2. Загрузка изображения тура
            if (image) {
                const formData = new FormData()
                formData.append("image", image)
                await axios.post(`${baseUrl}/api/v1/admin/tours/uploadImage?tourId=${tourId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
            }

            const numericTourId = Number(tourId);

            if (!numericTourId || isNaN(numericTourId)) {
                console.error("❌ Ошибка: tour_id некорректен!", tourId);
                alert("Ошибка: неверный ID тура");
                return;
            }


            // 3. Добавление поинтов
            for (const point of points) {
                try {
                    console.log("📦 Отправка поинта:", {
                        tour_id: Number(tourId),
                        name: point.name,
                        description: point.description,
                        number: point.number
                    })
                    const pointRes = await axios.post(`${baseUrl}/api/v1/admin/points/add`, {
                        tour_id: numericTourId, // <= сюда
                        name: point.name,
                        description: point.description,
                        number: point.number,
                        image: ""
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    const pointId = pointRes.data?.id || pointRes.data?.result?.id;
                    console.log("POINT ID:", pointId);

                    if (point.image && pointId) {
                        const pointImg = new FormData()
                        pointImg.append("image", point.image)
                        await axios.post(`${baseUrl}/api/v1/admin/points/uploadImage?pointId=${pointId}`, pointImg, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "multipart/form-data"
                            }
                        })
                        console.log("TOUR RESPONSE:", tourRes.data);
                        console.log("TOUR ID:", tourId);
                    }
                } catch (err) {
                    console.error("Ошибка при создании точки маршрута", err);
                    alert("Ошибка при создании точки маршрута");
                    return;
                }
            }

            // 4. Добавление расписания
            try {
                await axios.post(`${baseUrl}/api/v1/admin/schedule/add`, {
                    tour_id: tourId,
                    start_at: new Date(startAt).toISOString(),
                    end_at: new Date(endAt).toISOString(),
                    guide: guide,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } catch (err) {
                console.error("Ошибка при создании расписания", err)
                alert("Ошибка при создании расписания")
                return
            }

            alert("Тур создан успешно!")
            navigate("/admin/dashboard")

        } catch (err) {
            console.error("Ошибка при создании тура:", err)
            alert("Ошибка при создании тура")
        }
    }

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Создать тур</h1>

            <input className="input" placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
            <textarea className="input" placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
            <input className="input" placeholder="Место" value={place} onChange={e => setPlace(e.target.value)} />
            <input className="input" type="number" placeholder="Цена" value={price} onChange={e => setPrice(+e.target.value)} />
            <input className="input" type="number" placeholder="Макс. участников" value={maxMembers} onChange={e => setMaxMembers(+e.target.value)} />
            <input className="input" type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />

            <h2 className="text-xl font-semibold">Точки маршрута</h2>
            {points.map((point, idx) => (
                <div key={idx} className="border p-4 space-y-2">
                    <input className="input" placeholder="Название" value={point.name} onChange={e => {
                        const newPoints = [...points]
                        newPoints[idx].name = e.target.value
                        setPoints(newPoints)
                    }} />
                    <textarea className="input" placeholder="Описание" value={point.description} onChange={e => {
                        const newPoints = [...points]
                        newPoints[idx].description = e.target.value
                        setPoints(newPoints)
                    }} />
                    <input className="input" type="file" onChange={(e) => {
                        const newPoints = [...points]
                        newPoints[idx].image = e.target.files?.[0]
                        setPoints(newPoints)
                    }} />
                </div>
            ))}
            <button onClick={handleAddPoint} className="btn-secondary">+ Добавить точку</button>

            <h2 className="text-xl font-semibold">Расписание</h2>
            <input className="input" type="datetime-local" value={startAt} onChange={e => setStartAt(e.target.value)} />
            <input className="input" type="datetime-local" value={endAt} onChange={e => setEndAt(e.target.value)} />
            <input className="input" placeholder="Гид" value={guide} onChange={e => setGuide(e.target.value)} />

            <button className="btn-primary mt-4" onClick={handleSubmit}>Создать тур</button>
            <AdminDashboard></AdminDashboard>
        </div>
    )
}
