document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const searchInput = document.getElementById('searchInput');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');
            const tableBody = document.querySelector('#table1 tbody');
            rows.forEach(row => {
                const cols = row.split(',');
                const tr = document.createElement('tr');
                cols.forEach((col, index) => {
                    const td = document.createElement('td');
                    if (index === 3) { // Assuming the 4th column contains the link
                        const link = document.createElement('a');
                        link.href = col.trim();
                        link.textContent = col.trim();
                        link.target = "_blank";
                        td.appendChild(link);
                    } else {
                        td.textContent = col.trim();
                    }
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        });

    searchInput.addEventListener('input', function () {
        const searchValue = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#table1 tbody tr');
        rows.forEach(row => {
            const cells = row.getElementsByTagName('td');
            let match = false;
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent.toLowerCase().includes(searchValue)) {
                    match = true;
                    break;
                }
            }
            if (match) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
