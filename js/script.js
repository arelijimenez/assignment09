// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    [23122345,'Sally',1234,"sally@mail.com","Administrative"],
    [45678904,'Thom',5678,"thom@mail.com", "Engineering"],
    [78654321,'Peter',6543,"peter@mail.com","Executive"],
    [76543217,'Sue',9812,"sue@mail.com","Marketing"],
    [98765432,'Fred',7612,"fred@mail.com","Assurance"],
    [98765430,'Ann',8760,"ann@mail.com","Administrative"]
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage !== null) {
    storage = localStorage.getItem('employees') 
    if (storage !== null) {
        employees = JSON.parse(storage);
    } else {
        localStorage.setItem('employees', JSON.stringify(employees));
    }
}

// GET DOM ELEMENTS
const $ = (id) => {
    return document.getElementById(id);
};

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
function createTable() {
    buildGrid();
}

// ADD EMPLOYEE
document.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    let id          = document.querySelector('#id').value;
    let name        = document.querySelector('#name').value;
    let extension   = document.querySelector('#extension').value;
    let email       = document.querySelector('#email').value;
    let department  = document.querySelector('#department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = [id, name, extension, email, department];
    
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);
    
    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    document.querySelector('#id').value = ''; 
    document.querySelector('#name').value = ''; 
    document.querySelector('#extension').value = ''; 
    document.querySelector('#email').value = ''; 
    document.querySelector('#department').value = ''; 
    
    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#id').focus();
});

// DELETE EMPLOYEE
function removeRow(index) {
    // CONFIRM THE DELETE
    if (confirm('Are you sure you want to delete this task?')) {

        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
        let table = document.getElementById("employees");
        table.deleteRow(index);

        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(index-1, 1);

        // BUILD THE GRID
        buildGrid();
    }
}

// BUILD THE EMPLOYEES GRID
function buildGrid() {

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    let table = document.getElementById("employees");
    table.tBodies[0].remove();


    // REBUILD THE TBODY FROM SCRATCH
    let body = "";

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    for (var row of employees) {
        body += "<tr>";
        // REBUILDING THE ROW STRUCTURE
        for (var cell of row) {
            body += "<td>" + cell + "</td>";
        }
        body += "<td><button onclick='removeRow(this.parentElement.parentElement.rowIndex)'>X</button></td>"
        body += "</tr>";
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    let tbody = table.createTBody();
    tbody.innerHTML = body;

    // UPDATE EMPLOYEE COUNT
    document.getElementById('empCount').innerHTML = employees.length;

    // STORE THE ARRAY IN STORAGE
    //localStorage.setItem('employees', JSON.stringify(employees));
    //let newArray = JSON.parse(localStorage.getItem('employees'));
}

buildGrid();