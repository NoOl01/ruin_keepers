import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/admin/login")
    }

    return (
        <div className="p-6 space-y-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">Админ-панель</h1>
            <button onClick={() => navigate("/admin/tours/create")} className="btn-primary">Создать тур</button>
            <button onClick={() => navigate("/admin/register")} className="btn-primary">Зарегистрировать админа</button>
            <button onClick={() => navigate("/admin/change-password")} className="btn-primary">Сменить пароль</button>
            <button onClick={() => navigate("/admin/delete")} className="btn-danger">Удалить админа</button>
            <button onClick={logout} className="btn-secondary">Выйти</button>
        </div>
    )
}