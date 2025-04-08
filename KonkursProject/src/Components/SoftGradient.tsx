export default function SoftGradient({ className = "", size = "300px", gradient = "rgba(255, 227, 157, 0.4)" }) {
    return (
        <div
            className={`pointer-events-none absolute z-0 ${className}`}
            style={{
                background: `radial-gradient(circle at center, ${gradient} 0%, transparent 70%)`,
                filter: "blur(80px)",
                width: size, // Размер можно регулировать через prop
                height: size, // Высота равна размеру
                zIndex: 9999, // Чтобы не перекрывал остальной контент
            }}
        />
    );
}
