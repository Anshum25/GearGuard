// Generate a placeholder avatar blob from initials
export async function generateAvatarBlob(name: string, size: number = 200): Promise<Blob> {
    if (typeof document === 'undefined') {
        // Fallback for SSR
        return new Blob([''], { type: 'image/png' });
    }

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d')!;
    
    // Set background color (Odoo-inspired purple)
    ctx.fillStyle = '#7C3AED';
    ctx.fillRect(0, 0, size, size);
    
    // Set text color and style
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${size / 3}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Get initials
    const initials = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
    
    // Draw initials
    ctx.fillText(initials, size / 2, size / 2);
    
    // Convert to blob
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob!);
        }, 'image/png');
    });
}
