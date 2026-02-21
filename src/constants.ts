export const OWNERS = ['Aさん', 'Bさん', '共有'] as const;

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

export const OWNER_COLORS: Record<string, string> = {
    'Aさん': '#3b82f6',
    'Bさん': '#10b981',
    '共有': '#f59e0b',
};
