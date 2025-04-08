import { useState } from "react"
import axios from "axios"
import {baseUrl} from "../BaseUrl.ts";

export default function AdminChangePassword() {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const token = localStorage.getItem("token")

    const handleChange = async () => {
        try {
            await axios.post(`${baseUrl}api/v1/admin/changePassword`, {
                old_password: oldPass,
                new_password: newPass
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert("Пароль изменён успешно")
        } catch {
            alert("Ошибка при смене пароля")
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Смена пароля</h1>
            <input className="input" type="password" placeholder="Старый пароль" value={oldPass} onChange={e => setOldPass(e.target.value)} />
            <input className="input" type="password" placeholder="Новый пароль" value={newPass} onChange={e => setNewPass(e.target.value)} />
            <button className="btn-primary mt-4" onClick={handleChange}>Сменить</button>
        </div>
    )
}