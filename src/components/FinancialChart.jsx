import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FinancialChart({ data, formatNumber }) {
    return (
        <div className="w-full h-48 mt-6">
            <h3 className="text-xl font-semibold text-center text-gray-200 mb-4">📊 Moliyaviy Grafik</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" tickFormatter={formatNumber} />
                    <Tooltip wrapperStyle={{ backgroundColor: "#333", color: "white" }} formatter={(value) => formatNumber(value)} />
                    <Bar dataKey="value" fill="#F59E0B" barSize={35} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}