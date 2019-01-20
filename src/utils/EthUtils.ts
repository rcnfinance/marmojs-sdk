export function toHexStringZeroPadded(value: string, lenght: number): string {
    let source: string = value;
    source = source.replace("0x", '');
    if (source.length < lenght) {
        const diff = lenght - source.length;
        source = '0'.repeat(diff) + source;
    }
    return "0x" + source;
}
