export const OWNER_COLOR_PALETTE = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#ef4444',
];

export const CATEGORIES = [
    '現金・預貯金',
    '株式',
    '投資信託',
    '暗号資産',
    'その他',
] as const;

export const STORAGE_KEY = 'asset-records';

export const CATEGORY_COLORS: Record<string, string> = {
    '現金・預貯金': '#3b82f6',
    '株式': '#10b981',
    '投資信託': '#f59e0b',
    '暗号資産': '#8b5cf6',
    'その他': '#6b7280',
};

export function getOwnerColor(name: string, allOwners: string[]): string {
    const idx = allOwners.indexOf(name);
    return OWNER_COLOR_PALETTE[(idx >= 0 ? idx : name.length) % OWNER_COLOR_PALETTE.length];
}
