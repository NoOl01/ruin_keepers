import { useState } from "react"
import axios from "axios"

export default function AdminDelete() {
    const [adminId, setAdminId] = useState("")
    const token = localStorage.getItem("token")

    const handleDelete = async () => {
        try {
            await axios.post(`http://localhost:8080/api/v1/admin/delete?adminId=${adminId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert("Админ удалён")
        } catch {
            alert("Ошибка удаления")
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Удаление администратора</h1>
            <input className="input" placeholder="ID администратора" value={adminId} onChange={e => setAdminId(e.target.value)} />
            <button className="btn-danger mt-4" onClick={handleDelete}>Удалить</button>
        </div>
    )
}