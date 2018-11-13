/*function info(form){ 
    var jcontent = {
        "First Name": form.first.value,
        "Last Name": form.last.value,
        "Email": form.email.value
    }

    var html = JSON.stringify(json,0,4);
    document.getElementById('output').innerHTML=html;
    return false;
}*/

var studentArr = [];

var stuObj = {
    firstname:first,
    lastname:last,
    email:email
};
//33 min
function init(){
    if(localStorage.studentRec){
    document.getElementById('output').innerHTML=html;
        studentArr = JSON.parse(localStorage.studentRec);
        for(var i=0; i<studentArr.length;i++){
            var firstname = studentArr[i].firstname;
            var lastname = studentArr[i].lastname;
            var email = studentArr[i].email;
        }
    }
}
studentArr.push(stuObj);

localStorage.studentRec = JSON.stringify(studentArr);
