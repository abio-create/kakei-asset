import { useState, useCallback, useMemo } from 'react';
import type { AssetRecord } from '../types';
import {
    getAllRecords,
    addRecord,
    updateRecord,
    removeRecord,
    saveAllRecords,
} from '../utils/storage';
import { nanoid } from 'nanoid';

export function useAssetRecords() {
    const [records, setRecords] = useState<AssetRecord[]>(() => getAllRecords());

    const add = useCallback(
        (data: Omit<AssetRecord, 'id'>) => {
            const record: AssetRecord = { ...data, id: nanoid() };
            const updated = addRecord(record);
            setRecords(updated);
        },
        []
    );

    const update = useCallback(
        (record: AssetRecord) => {
            const updated = updateRecord(record);
            setRecords(updated);
        },
        []
    );

    const remove = useCallback(
        (id: string) => {
            const updated = removeRecord(id);
            setRecords(updated);
        },
        []
    );

    const bulkAdd = useCallback(
        (items: Omit<AssetRecord, 'id'>[]) => {
            const current = getAllRecords();
            const newRecords = items.map((item) => ({ ...item, id: nanoid() }));
            const all = [...current, ...newRecords];
            saveAllRecords(all);
            setRecords(all);
        },
        []
    );

    // Sorted unique year-months
    const yearMonths = useMemo(() => {
        const set = new Set(records.map((r) => r.yearMonth));
        return Array.from(set).sort();
    }, [records]);

    // Latest year-month
    const latestYearMonth = useMemo(() => {
        return yearMonths.length > 0 ? yearMonths[yearMonths.length - 1] : null;
    }, [yearMonths]);

    // Total asset per month (for line chart)
    const monthlyTotals = useMemo(() => {
        const map = new Map<string, number>();
        for (const r of records) {
            map.set(r.yearMonth, (map.get(r.yearMonth) ?? 0) + r.amount);
        }
        return yearMonths.map((ym) => ({ yearMonth: ym, total: map.get(ym) ?? 0 }));
    }, [records, yearMonths]);

    // Breakdown for a given month
    const getBreakdownByOwner = useCallback(
        (yearMonth: string) => {
            const filtered = records.filter((r) => r.yearMonth === yearMonth);
            const map = new Map<string, number>();
            for (const r of filtered) {
                map.set(r.owner, (map.get(r.owner) ?? 0) + r.amount);
            }
            return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
        },
        [records]
    );

    const getBreakdownByCategory = useCallback(
        (yearMonth: string) => {
            const filtered = records.filter((r) => r.yearMonth === yearMonth);
            const map = new Map<string, number>();
            for (const r of filtered) {
                map.set(r.category, (map.get(r.category) ?? 0) + r.amount);
            }
            return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
        },
        [records]
    );

    const getRecordsByMonth = useCallback(
        (yearMonth: string) => {
            return records.filter((r) => r.yearMonth === yearMonth);
        },
        [records]
    );

    const latestTotal = useMemo(() => {
        if (!latestYearMonth) return 0;
        return records
            .filter((r) => r.yearMonth === latestYearMonth)
            .reduce((sum, r) => sum + r.amount, 0);
    }, [records, latestYearMonth]);

    return {
        records,
        add,
        update,
        remove,
        bulkAdd,
        yearMonths,
        latestYearMonth,
        latestTotal,
        monthlyTotals,
        getBreakdownByOwner,
        getBreakdownByCategory,
        getRecordsByMonth,
    };
}
