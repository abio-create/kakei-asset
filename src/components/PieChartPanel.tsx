import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface PieData {
    name: string;
    value: number;
}

interface Props {
    title: string;
    data: PieData[];
    colors: Record<string, string>;
}

const DEFAULT_COLORS = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ef4444',
    '#06b6d4',
    '#ec4899',
];

function getColor(name: string, colors: Record<string, string>, index: number): string {
    return colors[name] ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

export default function PieChartPanel({ title, data, colors }: Props) {
    if (data.length === 0) {
        return (
            <div className="chart-panel chart-empty pie-panel">
                <p>データがありません</p>
            </div>
        );
    }

    const total = data.reduce((s, d) => s + d.value, 0);

    return (
        <div className="chart-panel pie-panel">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        animationDuration={600}
                        label={false}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={entry.name}
                                fill={getColor(entry.name, colors, index)}
                                stroke="none"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number | undefined) => [
                            `¥${(value ?? 0).toLocaleString()} (${(((value ?? 0) / total) * 100).toFixed(1)}%)`,
                        ]}
                        contentStyle={{
                            background: 'rgba(255,255,255,0.96)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
            {/* カスタム凡例 — 名前・金額・割合をすべて表示 */}
            <ul className="pie-legend">
                {data.map((entry, index) => {
                    const pct = ((entry.value / total) * 100).toFixed(1);
                    return (
                        <li key={entry.name} className="pie-legend-item">
                            <span
                                className="pie-legend-dot"
                                style={{ background: getColor(entry.name, colors, index) }}
                            />
                            <span className="pie-legend-name">{entry.name}</span>
                            <span className="pie-legend-value">
                                ¥{entry.value.toLocaleString()}
                            </span>
                            <span className="pie-legend-pct">{pct}%</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

