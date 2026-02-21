import { useState, useMemo } from 'react';
import TotalAssetCard from './TotalAssetCard';
import LineChartPanel from './LineChartPanel';
import PieChartPanel from './PieChartPanel';
import { CATEGORY_COLORS, getOwnerColor } from '../constants';

interface Props {
    latestTotal: number;
    latestYearMonth: string | null;
    monthlyTotals: { yearMonth: string; total: number }[];
    yearMonths: string[];
    getBreakdownByOwner: (ym: string) => { name: string; value: number }[];
    getBreakdownByCategory: (ym: string) => { name: string; value: number }[];
}

export default function Dashboard({
    latestTotal,
    latestYearMonth,
    monthlyTotals,
    yearMonths,
    getBreakdownByOwner,
    getBreakdownByCategory,
}: Props) {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const activeMonth = selectedMonth ?? latestYearMonth;

    const ownerData = useMemo(
        () => (activeMonth ? getBreakdownByOwner(activeMonth) : []),
        [activeMonth, getBreakdownByOwner]
    );

    const categoryData = useMemo(
        () => (activeMonth ? getBreakdownByCategory(activeMonth) : []),
        [activeMonth, getBreakdownByCategory]
    );

    const ownerColors = useMemo(() => {
        const allOwners = ownerData.map((d) => d.name);
        const map: Record<string, string> = {};
        for (const owner of allOwners) {
            map[owner] = getOwnerColor(owner, allOwners);
        }
        return map;
    }, [ownerData]);

    return (
        <div className="dashboard">
            <TotalAssetCard total={latestTotal} yearMonth={latestYearMonth} />

            <LineChartPanel data={monthlyTotals} />

            <div className="pie-section">
                <div className="month-selector">
                    <label htmlFor="pie-month">表示月: </label>
                    <select
                        id="pie-month"
                        value={activeMonth ?? ''}
                        onChange={(e) => setSelectedMonth(e.target.value || null)}
                    >
                        {yearMonths.length === 0 && <option value="">---</option>}
                        {yearMonths.map((ym) => (
                            <option key={ym} value={ym}>
                                {ym.replace('-', '/')}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="pie-charts-row">
                    <PieChartPanel
                        title="🏠 所有者別"
                        data={ownerData}
                        colors={ownerColors}
                    />
                    <PieChartPanel
                        title="📂 カテゴリ別"
                        data={categoryData}
                        colors={CATEGORY_COLORS}
                    />
                </div>
            </div>
        </div>
    );
}

