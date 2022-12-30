let customers = [];

function Customer(id, name, address, salary) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.salary = salary;
}

initializeCustomers = () => {
    let tempData = JSON.parse(localStorage.getItem('customers'));
    console.log(tempData)
    if (tempData !== null) {
        customers = tempData;
        console.log(tempData);
        setTableData();
    }
}

function setTableData() {
    searchText = $('#search').val().toLowerCase();
    let htmlData = '';
    customers.forEach(data => {
        console.log(searchText)
        if (data.name.toLowerCase().includes(searchText) || data.address.toLowerCase().includes(searchText)) {
            htmlData += `<tr>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.address}</td>
        <td>${data.salary}</td>
        <td>
        <button class="btn btn-success btn-sm" onclick="loadUpdateModal('${data.id}','${data.name}','${data.address}', ${data.salary})">Update</button> | 
        <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${data.id}')";>Delete</button>
</td>
</tr>`;
        }
    });
    $('#table_body').html(htmlData);
}

function deleteCustomer(id) {
    if (confirm('are you sure?')) {
        for (let tempId = 0; tempId < customers.length; tempId++) {
            if (customers[tempId].id === id) {
                customers.splice(tempId, 1);
                localStorage.setItem('customers', JSON.stringify(customers));
                launchModal('Deleted!', 'Customer Deleted');
                setTableData();
            }
        }
    }
}

function saveCustomer() {
    let customer = new Customer(
        $('#customerId').val(),
        $('#customerName').val(),
        $('#customerAddress').val(),
        Number($('#customerSalary').val())
    );

    if (customers.find(data => customer.id == data.id) == undefined) {
        customers.push(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
        clearFields();
        launchModal('success!', 'Customer Saved');
        setTableData();
    } else {
        launchModal('warning!', 'Already Exists');
    }

}


const launchModal = (type, message) => {
    $('#exampleModalLabel').html(type);
    $('.save-data-body').html(message);
    $('#success-modal').click();
}

const clearFields = () => {
    $('#customerId').val('');
    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#customerSalary').val('');
}
let tempCustomerId = 0;

function loadUpdateModal(id, name, address, salary) {
    tempCustomerId = id;
    $('#update_customer_id').val(id);
    $('#update_customer_name').val(name);
    $('#update_customer_address').val(address);
    $('#update_customer_salary').val(salary);

    $('#update-modal-button').click();
}

function updateCustomer() {
    for (let tempId = 0; tempId < customers.length; tempId++) {
        if (customers[tempId].id === tempCustomerId) {
            customers[tempId].name = $('#update_customer_name').val()
            customers[tempId].address = $('#update_customer_address').val()
            customers[tempId].salary = Number($('#update_customer_salary').val())
            localStorage.setItem('customers', JSON.stringify(customers));
            $('#update-close').click();
            launchModal('Updated!', 'Customer Updated');
            setTableData();
        }
    }
}