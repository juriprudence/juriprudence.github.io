const firebaseConfig = {
  apiKey: "AIzaSyA3YltChWDcrQjZhgrv5O_df5VeA1CcVRo",
  authDomain: "emailaut-8374c.firebaseapp.com",
  databaseURL: "https://emailaut-8374c.firebaseio.com",
  projectId: "emailaut-8374c",
  storageBucket: "emailaut-8374c.appspot.com",
  messagingSenderId: "441619242876",
  appId: "1:441619242876:web:b77ee0cdc13ee5ee8ecef9",
  measurementId: "G-9ZKXZ2MT0M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  let database = firebase.database();

// Get the user's referrer URL
 var avocat = document.getElementById("link_p"); 
avocat.addEventListener("click",avo)

// Get the current date
var date = new Date();
var dateString = date.toISOString().substring(0, 10);



// Save the user's referrer URL to the database

// Increment the user count for the current day
database.ref("users_per_day/" + dateString).transaction(function(currentCount) {
  return (currentCount || 0) + 1;
});
function avo()
{
console.log("helow")
 database.ref("avocat/" + dateString).transaction(function(currentCount) {
  return (currentCount || 0) + 1;
});
}


function updateQueryParameter() {
    // Get the text from the input
    let text = document.getElementById("srt").value;

    // Update the URL with the new query parameter
    window.history.pushState({}, "", `?text=${text}`);
    console.log(text)
  let currentUrl = window.location.href;

    // Create a hidden text field
    let tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    // Select the text in the hidden field
    tempInput.select();

    // Copy the text to the clipboard
    document.execCommand("copy");

 
    // Remove the hidden field
    document.body.removeChild(tempInput);

    // Display a message to indicate that the URL has been copied
    alert("URL copied to clipboard: " + currentUrl);
  }

 let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("text")) {
    // If the URL has the query parameter, set the value of the text input
    console.log("has valu"+urlParams.get("text"))
    document.getElementById("srt").value = urlParams.get("text");
    var st=document.getElementById("srt")
    var num=document.getElementById("ticketNum")
    serch()
  }


var bu=document.getElementById("btn")
var st=document.getElementById("srt")
var num=document.getElementById("ticketNum")
var resp=document.getElementById("resp")
var ex1=document.getElementById("ex1")
//data to save in firebase
var datares=""
//list name for button to improve
buttonlistname=["لا علاقة","يتقارب قليلا في المعنى","نفس المعنى لكن ليس مطابق","المعنى مطابق للبحث"]

bu.addEventListener("click",serch)
ex1.addEventListener("change",cha


)
///
document.addEventListener("click",function(e){
  if(e.target.id=="nump")
  {
    num.value=e.target.innerHTML-1
    serch()
  }
})
ex2.addEventListener("change",cha2


)
function cha2()

{
    var st=document.getElementById("srt")
    if(ex2.checked)
    {
    st.value=ex2.value
    }
    else
    {
      st.value=""
    }
    
}
function cha()

{
    var st=document.getElementById("srt")
    if(ex1.checked)
    {
    st.value=ex1.value

    }
    else
    {
      st.value=""
    }
}
//send data to firbase
function send_res(even)
{

let reft = database.ref('serch_fr_train');
reft.push({searchfor:st.value,res_data:datares[0],rel_valeu:even.target.id*0.33})  
alert('تم اضافة التقييم بنجاح شكرا على المساعدة');

}

function serch()
{
  nump=document.getElementById("nump")
  nump.style.display=""
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
        let ref = database.ref('searchs');
        ref.push({searchfor:st.value,date:dateTime})  
    wrd=st.value
    fetch("https://ramdane-search-jurist2.hf.space/run/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            wrd,
            num.value,
          ]
        })})
      .then(r => r.json())
      .then(
        r => {
          let data = r.data;
          datares=data
          resp.innerHTML=data
          if(data!="لم نتمكن من ايجاد النتيجة اما لعدم وجود الاجتهاد او لعدم كتابة جملة بحث مناسبة")
          
          {//creat bouton
          var buttonContainer = document.createElement('div');
          buttonContainer.className = 'col-12 ';
          buttonContainer.style="background-color:white;"
          p=document.createElement('p')
          p.innerHTML="ساهم في تحسين محرك البحث"
          
          buttonContainer.appendChild(p);
          for (var i = 0; i < 4; i++) {
            // Create a button
            var button = document.createElement('button');
            // Set the button's text
            button.className="btn btn-primary"
            button.innerHTML = buttonlistname[i]
            button.id=i
            button.addEventListener("click",send_res)
            // Add the button to the container
            buttonContainer.appendChild(button);
          }
          
          // Add the button container to the page
          resp.appendChild(buttonContainer);
        }
        }
      )
}
