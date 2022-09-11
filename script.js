//Required Elements

const form = document.querySelector("form");
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
    e.preventDefault(); //stops form from submitting
    statusTxt.style.display = "block";
    statusTxt.style.color = "red";

    let xhr = new XMLHttpRequest(); //creating new XML object
    xhr.open("POST", "message.php", true); //sending post message to message.php file
    xhr.onload = ()=>{ //Once Ajazx is loaded
        if (xhr.readyState == 4 && xhr.status ==200) { //if ajax response status is 200 & ready status is 4 means thers is no error
            let response = xhr.response; //storing ajax response in a response variable
            if (response.indexOf("Email and password field is required!") != -1 || response.indexOf("Enter a valid email address!") || response.indexOf("Sorry, failed to send your message")) {
                statusTxt.style.color = "red";
            }else{
                form.reset();
                setTimeout(()=>{
                    statusTxt.style.display = "none";
                }, 3000);
            }
            statusTxt.innerText = response;
        }
    }
    let formData = new FormData(form); //Creating new FormData obj. This obj is used to send form data
    xhr.send(); //sending form data
}