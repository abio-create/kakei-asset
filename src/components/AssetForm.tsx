import { useState, type FormEvent } from 'react';
import { OWNERS, CATEGORIES } from '../constants';
import type { AssetRecord } from '../types';

interface Props {
    onAdd: (data: Omit<AssetRecord, 'id'>) => void;
}

function getCurrentYearMonth(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function AssetForm({ onAdd }: Props) {
    const [yearMonth, setYearMonth] = useState(getCurrentYearMonth());
    const [owner, setOwner] = useState<string>(OWNERS[0]);
    const [category, setCategory] = useState<string>(CATEGORIES[0]);
    const [amount, setAmount] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const numAmount = Number(amount);
        if (!yearMonth || !owner || !category || isNaN(numAmount) || numAmount < 0) return;
        onAdd({ yearMonth, owner, category, amount: numAmount });
        setAmount('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <form className="asset-form" onSubmit={handleSubmit}>
            <h3 className="form-title">➕ 資産データを追加</h3>

            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="yearMonth">記録年月</label>
                    <input
                        type="month"
                        id="yearMonth"
                        value={yearMonth}
                        onChange={(e) => setYearMonth(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="owner">所有者</label>
                    <select
                        id="owner"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    >
                        {OWNERS.map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="category">カテゴリ</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="amount">金額（円）</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        min="0"
                        required
                    />
                </div>
            </div>

            <button type="submit" className="btn-primary" id="add-asset-btn">
                追加する
            </button>

            {showSuccess && (
                <p className="success-msg">✅ データを追加しました</p>
            )}
        </form>
    );
}
