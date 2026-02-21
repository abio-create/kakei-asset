interface Props {
    total: number;
    yearMonth: string | null;
}

export default function TotalAssetCard({ total, yearMonth }: Props) {
    return (
        <div className="total-card">
            <div className="total-card-inner">
                <p className="total-label">
                    {yearMonth
                        ? `${yearMonth.replace('-', '/')} 時点`
                        : '---'}
                </p>
                <p className="total-label-sub">総資産額</p>
                <p className="total-amount">
                    <span className="yen-symbol">¥</span>
                    {total.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
