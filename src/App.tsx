import { useState } from 'react';
import { useAssetRecords } from './hooks/useAssetRecords';
import Dashboard from './components/Dashboard';
import AssetForm from './components/AssetForm';
import AssetTable from './components/AssetTable';

type Tab = 'dashboard' | 'manage';

export default function App() {
    const {
        records,
        add,
        update,
        remove,
        yearMonths,
        latestYearMonth,
        latestTotal,
        monthlyTotals,
        getBreakdownByOwner,
        getBreakdownByCategory,
        getRecordsByMonth,
    } = useAssetRecords();

    const [activeTab, setActiveTab] = useState<Tab>('dashboard');

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-inner">
                    <h1 className="app-title">
                        <span className="logo-icon">💰</span>
                        カケイアセット
                    </h1>
                    <p className="app-subtitle">家庭の資産を、ひと目で。</p>
                </div>
            </header>

            <nav className="tab-nav">
                <button
                    className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                    id="tab-dashboard"
                >
                    📊 ダッシュボード
                </button>
                <button
                    className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                    onClick={() => setActiveTab('manage')}
                    id="tab-manage"
                >
                    📝 データ管理
                </button>
            </nav>

            <main className="main-content">
                {activeTab === 'dashboard' ? (
                    <Dashboard
                        latestTotal={latestTotal}
                        latestYearMonth={latestYearMonth}
                        monthlyTotals={monthlyTotals}
                        yearMonths={yearMonths}
                        getBreakdownByOwner={getBreakdownByOwner}
                        getBreakdownByCategory={getBreakdownByCategory}
                    />
                ) : (
                    <div className="manage-page">
                        <AssetForm onAdd={add} />
                        <AssetTable
                            records={records}
                            yearMonths={yearMonths}
                            getRecordsByMonth={getRecordsByMonth}
                            onUpdate={update}
                            onRemove={remove}
                        />
                    </div>
                )}
            </main>

            <footer className="app-footer">
                <p>© 2026 カケイアセット — Household Asset Tracker</p>
            </footer>
        </div>
    );
}
