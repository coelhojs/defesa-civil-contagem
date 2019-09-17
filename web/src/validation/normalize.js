export const normalizePhone = (value, previousValue) => {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^\d]/g, '');

    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length === 2) {
            return '(' + onlyNums + ')'
        }
        if (onlyNums.length <= 10) {
            return '(' + onlyNums.slice(0, 2) + ')' + onlyNums.slice(2, 10)
        }
        if (onlyNums.length === 11) {
            return '(' + onlyNums.slice(0, 2) + ')' + onlyNums.slice(2, 11)
        }
    }
    if (onlyNums.length <= 2) {
        return onlyNums
    }
    if (onlyNums.length <= 10) {
        return '(' + onlyNums.slice(0, 2) + ')' + onlyNums.slice(2, 10)
    }
    return '(' + onlyNums.slice(0, 2) + ')' + onlyNums.slice(2, 11)
}

export const normalizeCPF = (value, previousValue) => {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^\d]/g, '')
    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length <= 3) {
            return onlyNums
        }
        // if (onlyNums.length === 3) {
        //     return `${onlyNums + '.'}`
        // }
        if (onlyNums.length <= 6) {
            return `${onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6)}`
        }
        if (onlyNums.length <= 9) {
            return `${onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.' + onlyNums.slice(6, 9)}`;
        }
        return `${onlyNums.slice(0, 3) + '.'
            + onlyNums.slice(3, 6) + '.'
            + onlyNums.slice(6, 9) + '-'
            + onlyNums.slice(9, 11)}`;
    }
}

export const normalizeCNPJ = (value, previousValue) => {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^\d]/g, '')
    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length <= 2) {
            return onlyNums
        }
        if (onlyNums.length === 2) {
            return `${onlyNums + '.'}`
        }
        if (onlyNums.length <= 5) {
            return `${onlyNums.slice(0, 2) + '.' + onlyNums.slice(2, 5)}`
        }
        if (onlyNums.length <= 8) {
            return `${onlyNums.slice(0, 2) + '.' +
                onlyNums.slice(2, 5) + '.' +
                onlyNums.slice(5, 8)
                }`;
        }
        if (onlyNums.length <= 12) {
            return `${onlyNums.slice(0, 2) + '.' +
                onlyNums.slice(2, 5) + '.' +
                onlyNums.slice(5, 8) + '.' +
                onlyNums.slice(8, 12)
                }`;
        }

        return `${onlyNums.slice(0, 2) + '.' +
            onlyNums.slice(2, 5) + '.' +
            onlyNums.slice(5, 8) + '.' +
            onlyNums.slice(8, 12) + '-' +
            onlyNums.slice(12, 14)
            }`;
    }
}