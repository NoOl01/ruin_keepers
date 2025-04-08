import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/admin/login", { login, password })
            const token = res.data.result.result
            localStorage.setItem("token", token)
            navigate("/admin/dashboard")
        } catch {
            alert("Ошибка входа")
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Вход администратора</h1>
            <input className="input" placeholder="Логин" value={login} onChange={e => setLogin(e.target.value)} />
            <input className="input" type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="btn-primary mt-4" onClick={handleLogin}>Войти</button>
        </div>
    )
}
