
loadUserDetails=()=>{
    try {
        let userDetails =
            JSON.parse(localStorage.getItem('user'));
        $('.user-name').html(userDetails.name);
        $('#avatar').attr('src',userDetails.avatar);
    }catch (e) {
        alert('Something went wrong!');
        window.location.replace('../index.html')
    }

}

function setUi(location){
    $('#frame').attr('src',location);
   /* switch (name) {
        case "customer": $('#frame').attr('src','../pages/customer.html');break;
        case "item":$('#frame').attr('src','../pages/item.html');break;
        case "place-order":$('#frame').attr('src','../pages/place-order.html');break;
        case "orders":$('#frame').attr('src','../pages/orders.html');
    }*/
}