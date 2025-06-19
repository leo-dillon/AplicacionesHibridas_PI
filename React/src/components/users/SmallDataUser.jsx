import { Link } from "react-router-dom"

const SmallDataUser = ({ user }) => {
    return (
        <div
            key={user._id}
            className="user-card flex-1 w-[300px] border border-gray-300 rounded-xl p-4 text-center bg-gray-100"
        >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{user.firstName} {user.lastName}</h3>
            <hr className="border-gray-300 mb-3" />
            <p className="p-2 w-full max-w-8/10 text-start text-gray-800"><span className="text-gray-900 font-semibold">Email:</span> {user.email}</p>
            <p className="p-2 w-full max-w-8/10 text-start text-gray-800"><span className="text-gray-900 font-semibold">Género:</span> {user.gender}</p>
            <p className="p-2 w-full max-w-8/10 text-start text-gray-800"><span className="text-gray-900 font-semibold">Fecha de nacimiento:</span> {new Date(user.birthDate).toLocaleDateString("es-AR")}</p>
            <p className="p-2 w-full max-w-8/10 text-start text-gray-800"><span className="text-gray-900 font-semibold">DNI:</span> {user.dni}</p>
            <p className="p-2 w-full max-w-8/10 text-start text-gray-800"><span className="text-gray-900 font-semibold">Dirección:</span> {user.address}</p>
            <p className="p-2 w-full max-w-8/10 text-start text-gray-800"><span className="text-gray-900 font-semibold">Teléfono:</span> {user.phone}</p>
            <p className="p-2 w-full max-w-8/10 text-start text-gray-800"><span className="text-gray-900 font-semibold">Rol:</span> <strong>{user.role}</strong></p>
            <Link
                to={`/Editar_Usuario/${user._id}`}
                className="inline-block w-full text-blue-400 underline text-lg transition duration-300 border rounded-xl hover:text-blue-600"
                >
                Editar
            </Link>
        </div>
    )
}

export default SmallDataUser