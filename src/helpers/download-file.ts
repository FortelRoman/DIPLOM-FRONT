export const downloadFile = (content: any, fileName: string) => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(
        new Blob([content], {
            type: 'application/json',
        }),
    );
    link.download = fileName;
    link.click();
}