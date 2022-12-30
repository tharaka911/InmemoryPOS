const users=[
    {user:'nimal',password:'123',avatar:'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1666279238~exp=1666279838~hmac=e3530ccf6260bd3fdbe65d808373a37b48c0e39bf7c9af0505c2a98468358c0f'},
    {user:'kamal',password:'123', avatar:'https://img.freepik.com/premium-psd/3d-illustration-smiling-man-cartoon-close-up-portrait-standing-bearded-man-orange-background-3d-avatar-ui-ux_1020-5089.jpg?w=740'}
];

const login=()=>{
    let userName= $('#userName').val();
    let password= $('#password').val();
    if(userName.trim().length!==0 || password.trim().length!==0){
        for(const tempUser of users){
            if(tempUser.user===userName){
                //check password
                if(tempUser.password===password){
                    // login
                    localStorage.setItem('user',JSON.stringify({name:userName,avatar:tempUser.avatar}));
                    window.location.href='pages/dashboard.html';
                    return;
                }else{
                    alert('Password is incorrect');
                    return;
                }
            }
        }
        alert('Username is incorrect!');

    }else{
        alert('username or password is requered!');
    }
}