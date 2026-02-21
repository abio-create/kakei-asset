import { useState } from 'react';
import type { AssetRecord } from '../types';
import { CATEGORIES } from '../constants';

interface Props {
    records: AssetRecord[];
    yearMonths: string[];
    getRecordsByMonth: (ym: string) => AssetRecord[];
    onUpdate: (record: AssetRecord) => void;
    onRemove: (id: string) => void;
}

export default function AssetTable({
    yearMonths,
    getRecordsByMonth,
    onUpdate,
    onRemove,
}: Props) {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<AssetRecord | null>(null);

    const activeMonth =
        selectedMonth ?? (yearMonths.length > 0 ? yearMonths[yearMonths.length - 1] : null);
    const filteredRecords = activeMonth ? getRecordsByMonth(activeMonth) : [];

    const startEdit = (record: AssetRecord) => {
        setEditingId(record.id);
        setEditData({ ...record });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData(null);
    };

    const saveEdit = () => {
        if (editData) {
            onUpdate(editData);
            cancelEdit();
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('このデータを削除しますか？')) {
            onRemove(id);
        }
    };

    return (
        <div className="asset-table-wrapper">
            <h3 className="form-title">📋 資産データ一覧</h3>

            <div className="table-controls">
                <label htmlFor="table-month">表示月: </label>
                <select
                    id="table-month"
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

            {filteredRecords.length === 0 ? (
                <p className="table-empty">
                    {activeMonth
                        ? `${activeMonth.replace('-', '/')} のデータはまだありません`
                        : 'データがありません'}
                </p>
            ) : (
                <div className="table-scroll">
                    <table className="asset-table">
                        <thead>
                            <tr>
                                <th>所有者</th>
                                <th>カテゴリ</th>
                                <th>金額</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record) =>
                                editingId === record.id && editData ? (
                                    <tr key={record.id} className="editing-row">
                                        <td>
                                            <input
                                                type="text"
                                                value={editData.owner}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, owner: e.target.value })
                                                }
                                                placeholder="所有者"
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={editData.category}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, category: e.target.value })
                                                }
                                            >
                                                {CATEGORIES.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editData.amount}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        amount: Number(e.target.value),
                                                    })
                                                }
                                                min="0"
                                            />
                                        </td>
                                        <td className="action-cell">
                                            <button className="btn-save" onClick={saveEdit}>
                                                保存
                                            </button>
                                            <button className="btn-cancel" onClick={cancelEdit}>
                                                取消
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={record.id}>
                                        <td>{record.owner}</td>
                                        <td>{record.category}</td>
                                        <td className="amount-cell">
                                            ¥{record.amount.toLocaleString()}
                                        </td>
                                        <td className="action-cell">
                                            <button
                                                className="btn-edit"
                                                onClick={() => startEdit(record)}
                                            >
                                                編集
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(record.id)}
                                            >
                                                削除
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
