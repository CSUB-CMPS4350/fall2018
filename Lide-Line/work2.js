function info(form){ 
    var jcontent = {
        "First Name": form.first.value,
        "Last Name": form.last.value,
        "Email": form.email.value
    }

    var html = JSON.stringify(json,0,4);
    document.getElementById('output').innerHTML=html;
    return false;
}
