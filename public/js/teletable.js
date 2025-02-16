class TeleTable {
    constructor(data, kontejner) {
        this.data = data;  // Původní data
        this.container = document.getElementById(kontejner);
        this.sortedColumn = null;  // Sledování aktuálně seřazeného sloupce
        this.sortDirection = 'asc';  // Výchozí směr řazení (vzestupně)
        this.selectedRow = null;  // Sledování vybraného řádku
        this.render();
    }

    // Funkce pro detekci, zda je sloupec numerický
    isNumeric(value) {
        return !isNaN(value) && value !== null && value !== ''; // Zkontroluje, zda je hodnota číslo
    }

    // Funkce pro třídění dat podle zvoleného sloupce
    sortData(column) {
        const direction = this.sortedColumn === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortedColumn = column;
        this.sortDirection = direction;
    
        // Třídění podle vybraného sloupce
        this.data.sort((a, b) => {
            // Zajištění, že hodnoty nejsou null nebo undefined
            const valA = (a[column] ?? '').toString();
            const valB = (b[column] ?? '').toString();
    
            // Rozlišení podle typu dat: numerický vs textový
            if (this.isNumeric(valA) && this.isNumeric(valB)) {
                // Číselné porovnání
                const numA = parseFloat(valA);
                const numB = parseFloat(valB);
                return direction === 'asc' ? numA - numB : numB - numA;
            } else {
                // Textové porovnání s localeCompare pro správné porovnání diakritiky
                const compareResult = valA.localeCompare(valB, 'cs', { sensitivity: 'base' });
                return direction === 'asc' ? compareResult : -compareResult;
            }
        });
    }

    // Funkce pro vykreslení tabulky
    render() {
        // Vytvoření tabulky
        const table = document.createElement('table');
        table.classList = "table table-hover ts-table";
        const thead = table.createTHead();
        const tbody = table.createTBody();

        // Zjištění názvů sloupců
        const columns = Object.keys(this.data[0]);
        const comp = columns.findIndex(column => column.toLowerCase() === 'id');

        if (comp !== -1) {
            this.idColumnIndex = comp;
        }
        else {
            this.idColumnIndex = -1;
        }
        

        // Vytvoření záhlaví tabulky (th)
        const headerRow = thead.insertRow();
        columns.forEach((col, index) => {
            const th = document.createElement('th');
            th.innerText = col;
            th.innerHTML += ' <i class="bi bi-arrow-down-up"></i>';


            // Přidání event listeneru pro kliknutí
            th.addEventListener('click', () => {
                this.sortData(col);  // Řazení podle kliknutého sloupce
                this.render();  // Překreslení tabulky
            });

            headerRow.appendChild(th);
        });

        // Vykreslení dat v tabulce (tr)
        this.data.forEach(row => {
            const tr = tbody.insertRow();
            columns.forEach(col => {
                const td = tr.insertCell();
                td.innerText = row[col];
                td.setAttribute('ts-data-id', 1);
            });

            // Přidání event listeneru pro kliknutí na řádek
            tr.addEventListener('click', () => {
                this.selectRow(tr);  // Vybere a označí řádek
            });
        });


        // Vymazání obsahu kontejneru a přidání nové tabulky
        this.container.innerHTML = '';
        this.container.appendChild(table);

        // Po vykreslení tabulky znovu přidáme třídu pro aktivní sloupec
        if (this.sortedColumn !== null) {
            this.addActiveClass(columns.indexOf(this.sortedColumn));
        }
    }

    // Funkce pro přidání a odstranění třídy z aktivního sloupce
    addActiveClass(activeIndex) {
        // Najdi všechny th buňky v tabulce
        const allTh = document.querySelectorAll('th');

        // Odstraň všechny aktivní třídy
        allTh.forEach((th, index) => {
            th.classList.remove('ts-active-column');
            if (index === activeIndex) {
                th.classList.add("ts-active-column");
            }
        });
    }

    // Funkce pro výběr řádku a změnu jeho třídy
    selectRow(rowElement) {
        // Pokud je nějaký řádek vybrán, odebereme mu třídu
        if (this.selectedRow !== null) {
            this.selectedRow.classList.remove('table-secondary');
        }

        // Uložíme vybraný řádek do objektu
        this.selectedRow = rowElement;

        // Přidáme třídu 'active' k aktuálně vybranému řádku
        this.selectedRow.classList.add('table-secondary');

        // Získání hodnoty z buňky id
        this.selectedId = rowElement.cells[this.idColumnIndex].innerText;
        let hiddenInputs = document.getElementsByClassName('selected-id');

        Array.from(hiddenInputs).forEach(item => {
            item.value = this.selectedId;
        });

    }

    getSelectedId(){
        return this.selectedId;
    }

}