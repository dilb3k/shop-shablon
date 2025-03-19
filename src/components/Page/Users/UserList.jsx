import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/users/router"; // API dan emas, lokal fayldan olish

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // JSON-ni API kabi olish
        const data = getUsers();
        setUsers(data);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Foydalanuvchilar Ro'yxati</h2>
            <ul className="space-y-4">
                {users.map((user) => (
                    <li key={user.id} className="p-4 border rounded-lg shadow-md">
                        <p><strong>Ism:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Telefon:</strong> {user.phone}</p>
                        <p><strong>Rol:</strong> {user.role}</p>
                        <p><strong>Ro'yxatdan o'tgan sana:</strong> {new Date(user.registeredAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
