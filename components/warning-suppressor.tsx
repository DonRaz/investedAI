'use client';

import { useEffect } from 'react';

export function WarningSuppressor() {
    useEffect(() => {
        const originalError = console.error;
        console.error = (...args: any) => {
            if (typeof args[0] === 'string' && args[0].includes('Support for defaultProps will be removed')) {
                return;
            }
            originalError.apply(console, args);
        };
    }, []);

    return null;
} 