let items = [];

function Item(code, description, unitPrice, qtyOnHand) {
    this.code = code;
    this.description = description;
    this.unitPrice = unitPrice;
    this.qtyOnHand = qtyOnHand;
}

initializeItems = () => {
    let tempData = JSON.parse(localStorage.getItem('items'));
    if (tempData !== null) {
        items = tempData;
        setTableData();
    }
}

function setTableData() {
    searchText = $('#search').val().toLowerCase();
    let htmlData = '';
    items.forEach(data => {
        if (data.description.toLowerCase().includes(searchText)) {
            htmlData += `<tr>
        <td>${data.code}</td>
        <td>${data.description}</td>
        <td>${data.unitPrice}</td>
        <td>${data.qtyOnHand}</td>
        <td>
        <button class="btn btn-success btn-sm" onclick="loadUpdateModal('${data.code}','${data.description}','${data.unitPrice}', ${data.qtyOnHand})">Update</button> | 
        <button class="btn btn-danger btn-sm" onclick="deleteItem('${data.code}')">Delete</button>
</td>
</tr>`;
        }
    });
    $('#table_body').html(htmlData);
}

function deleteItem(code) {
    if (confirm('are you sure?')) {
        for (let tempId = 0; tempId < items.length; tempId++) {
            if (items[tempId].code === code) {
                items.splice(tempId, 1);
                localStorage.setItem('items', JSON.stringify(items));
                launchModal('Deleted!', 'Item Deleted');
                setTableData();
            }
        }
    }
}

function saveItem() {
    let item = new Item(
        $('#itemCode').val(),
        $('#itemDescription').val(),
        Number($('#unitPrice').val()),
        Number($('#qtyOnHand').val())
    );

    if (items.find(data => item.code == data.code) == undefined) {
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        clearFields();
        launchModal('success!', 'Item Saved');
        setTableData();
    } else {
        launchModal('warning!', 'Already Exists');
    }

}


const launchModal = (type, message) => {
    $('#exampleModalLabel').html(type);
    $('#save-data-body').html(message);
    $('#success-modal').click();
}

const clearFields = () => {
    $('#itemCode').val('');
    $('#itemDescription').val('');
    $('#unitPrice').val('');
    $('#qtyOnHand').val('');
}
let tempItemCode = 0;

function loadUpdateModal(code, description, unitPrice, qtyOnHand) {
    tempItemCode = code;
    $('#update_product_id').val(code);
    $('#update_product_description').val(description);
    $('#update_product_unit_price').val(unitPrice);
    $('#update_qty_on_hand').val(qtyOnHand);

    $('#update-modal-button').click();
}

function updateItem() {
    for (let tempId = 0; tempId < items.length; tempId++) {
        if (items[tempId].code === tempItemCode) {
            items[tempId].description = $('#update_product_description').val()
            items[tempId].unitPrice = $('#update_product_unit_price').val()
            items[tempId].qtyOnHand = Number($('#update_qty_on_hand').val())
            localStorage.setItem('items', JSON.stringify(items));
            $('#update-close').click();
            launchModal('Updated!', 'Item Updated');
            setTableData();
        }
    }
}