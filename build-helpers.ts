export const generateCssPrefix = (packageName: string): string => {
    if (!packageName || typeof packageName !== 'string') {
        throw new Error('Package name must be a non-empty string');
    }

    return packageName
        // Remove @ only at the beginning
        .replace(/^@/, '')
        // Replace all / with -
        .replace(/\//g, '-')
        // Remove invalid CSS characters
        .replace(/[^a-zA-Z0-9\-_]/g, '')
        // Remove leading/trailing dashes
        .replace(/^-+|-+$/g, '')
        // Replace multiple consecutive dashes with single dash
        .replace(/-+/g, '-')
        // Convert to lowercase for consistency
        .toLowerCase();

}