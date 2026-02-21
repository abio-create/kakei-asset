import type { AssetRecord } from '../types';
import { STORAGE_KEY } from '../constants';

export function getAllRecords(): AssetRecord[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as AssetRecord[];
    } catch {
        return [];
    }
}

export function saveAllRecords(records: AssetRecord[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function addRecord(record: AssetRecord): AssetRecord[] {
    const records = getAllRecords();
    records.push(record);
    saveAllRecords(records);
    return records;
}

export function updateRecord(updated: AssetRecord): AssetRecord[] {
    const records = getAllRecords().map((r) =>
        r.id === updated.id ? updated : r
    );
    saveAllRecords(records);
    return records;
}

export function removeRecord(id: string): AssetRecord[] {
    const records = getAllRecords().filter((r) => r.id !== id);
    saveAllRecords(records);
    return records;
}
