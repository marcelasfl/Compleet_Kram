export const decimalCommaFormatValue = (value: number | string | undefined) => {
    // Change the decimal separator from dot to comma
    return value ? value.toString().replace('.', ',') : '';
};

export const decimalCommaParseValue = (value: string | undefined) => {
    // Change the decimal separator from comma to dot
    const parsedValue = parseFloat(value?.replace(',', '.') || '0');

    // Check if the parsed value is a valid number
    return isNaN(parsedValue) ? 0 : parsedValue;
};