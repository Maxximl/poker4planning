export function chunkArray(array: any, chunk: number) {
    const newArray = [];
    for (let i = 0; i < array.length; i += chunk) {
        newArray.push(array.slice(i, i + chunk));
    }
    return newArray;
}

export const VALUES_MAP: Record<string, string> = {
    '1': '1h',
    '2': '2h',
    '4': '4h',
    '8': '1d',
    '12': '1.5d',
    '16': '2d',
    '20': '2.5d',
    '24': '3d'
}