import { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    data: { yearMonth: string; total: number }[];
}

function formatYen(value: number): string {
    if (value >= 10000) {
        return `${(value / 10000).toLocaleString()}万`;
    }
    return value.toLocaleString();
}

export default function LineChartPanel({ data }: Props) {
    const chartData = useMemo(
        () =>
            data.map((d) => ({
                ...d,
                label: d.yearMonth.replace('-', '/'),
            })),
        [data]
    );

    if (data.length === 0) {
        return (
            <div className="chart-panel chart-empty">
                <p>データがありません。「データ管理」から資産データを追加してください。</p>
            </div>
        );
    }

    return (
        <div className="chart-panel">
            <h3 className="chart-title">📈 総資産の推移</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                        tickFormatter={formatYen}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        width={70}
                    />
                    <Tooltip
                        formatter={(value: number | undefined) => [`¥${(value ?? 0).toLocaleString()}`, '総資産']}
                        contentStyle={{
                            background: 'rgba(255,255,255,0.96)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="url(#lineGradient)"
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 7, fill: '#2563eb' }}
                    />
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
