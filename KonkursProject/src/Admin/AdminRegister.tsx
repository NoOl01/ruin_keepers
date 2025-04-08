import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AdminRegister() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            alert("Доступ запрещен")
            navigate("/admin/login")
        }
    }, [token, navigate])

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/admin/register", {
                login,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            alert("Админ зарегистрирован успешно")
            navigate("/admin/dashboard")
        } catch (err) {
            alert("Ошибка при регистрации администратора")
            console.error(err)
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Регистрация администратора</h1>
            <input className="input" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
            <input className="input" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn-primary mt-4" onClick={handleRegister}>Создать администратора</button>
        </div>
    )
}
