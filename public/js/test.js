document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table.table');
    const headers = table.querySelectorAll('th');

    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => sortTableByColumn(table, index));
    });
});

let sortDirection = {};

function sortTableByColumn(table, columnIndex) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const header = table.querySelectorAll('th')[columnIndex];
    const isAscending = sortDirection[columnIndex] = !sortDirection[columnIndex];

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerHTML.trim();
        const cellB = rowB.cells[columnIndex].innerHTML.trim();

        if (header.innerText.toLowerCase().includes('checked')) {
            const valA = cellA.includes('bi-check-circle-fill text-success') ? 1 : 0;
            const valB = cellB.includes('bi-check-circle-fill text-success') ? 1 : 0;
            return isAscending ? valA - valB : valB - valA;
        }

        const isNumeric = !isNaN(cellA) && !isNaN(cellB);

        if (isNumeric) {
            return isAscending ? cellA - cellB : cellB - cellA;
        }

        return isAscending 
            ? cellA.localeCompare(cellB, 'cs', { sensitivity: 'base' })
            : cellB.localeCompare(cellA, 'cs', { sensitivity: 'base' });
    });

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));

    table.querySelectorAll('th').forEach(th => th.classList.remove('ts-active-column'));
    header.classList.add('ts-active-column');
} 

// Přidání CSS pro aktivní sloupec
const style = document.createElement('style');
style.innerHTML = `
    .ts-active-column { background-color: #e0e0e0; }
`;
document.head.appendChild(style);