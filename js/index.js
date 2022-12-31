var firebaseConfig = {
    apiKey: "AIzaSyA3YltChWDcrQjZhgrv5O_df5VeA1CcVRo",
    authDomain: "emailaut-8374c.firebaseapp.com",
    databaseURL: "https://emailaut-8374c.firebaseio.com",
    projectId: "emailaut-8374c",
    storageBucket: "emailaut-8374c.appspot.com",
    messagingSenderId: "441619242876",
    appId: "1:441619242876:web:b77ee0cdc13ee5ee8ecef9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);






var bu=document.getElementById("btn")
var st=document.getElementById("srt")
var num=document.getElementById("ticketNum")
var resp=document.getElementById("resp")
var ex1=document.getElementById("ex1")

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

function serch()
{
  nump=document.getElementById("nump")
  nump.style.display=""
    let database = firebase.database();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
        let ref = database.ref('searchs');
        ref.push({searchfor:st.value,date:dateTime})  
    wrd=st.value
    fetch("https://ramdane-search-jurist.hf.space/run/predict", {
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
          console.log(data)
          resp.innerHTML=data
        }
      )
}
