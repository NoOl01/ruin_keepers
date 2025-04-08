import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/admin/login")
    }

    return (
        <div className="w-56 h-screen bg-white shadow-2xl rounded-lg absolute top-20 left-0 flex flex-col items-start justify-start gap-10  dark:bg-gray-100">
            <h1 className="text-2xl font-bold">Админ-панель</h1>
            <button onClick={() => navigate("/admin/tours/create")} className="btn-primary text-xl bg-[#FFCF3F] w-full p-5 ">Создать тур</button>
            <button onClick={() => navigate("/admin/register")} className="btn-primary text-xl bg-[#FFCF3F] w-full p-5">Зарегистрировать админа</button>
            <button onClick={() => navigate("/admin/change-password")} className="btn-primary text-xl bg-[#FFCF3F] w-full p-5">Сменить пароль</button>
            <button onClick={() => navigate("/admin/delete")} className="btn-danger text-xl bg-[#FFCF3F] w-full p-5">Удалить админа</button>
            <button onClick={() => {
                logout
                navigate("/")
            }} className="btn-secondary text-xl bg-[#FFCF3F] w-full p-5">Выйти</button>
        </div>
    )
}