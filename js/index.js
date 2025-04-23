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

// --- Country Data ---
const apiUrls = {
    "Algeria": "https://ramdane-search-jurist3.hf.space/run/predict",
    "Morocco": "https://ramdane-search-juristmaroc.hf.space/run/predict",
    "Egypt": "https://ramdane-search-jurist-egypt.hf.space/run/predict",
    "Qatar": "https://ramdane-search-jurist-qatar.hf.space/run/predict"
};
// Add other API types (aiApi, factApi) here if needed later

// --- Element References ---
// Declare elements used globally early
const bu = document.getElementById("btn");
let st = document.getElementById("srt"); // Use let as .value is modified
let num = document.getElementById("ticketNum"); // Use let as .value is modified
let resp = document.getElementById("resp"); // Use let as .innerHTML is modified
const ex1 = document.getElementById("ex1");
const ex2 = document.getElementById("ex2");
const countrySelect = document.getElementById('countrySelect');
const avocat = document.getElementById("link_p"); // Moved declaration here

// --- Firebase & Analytics ---
// Get the user's referrer URL
// var avocat = document.getElementById("link_p"); // Declaration moved up
avocat.addEventListener("click", avo);

// Get the current date
var date = new Date();
var dateString = date.toISOString().substring(0, 10);

// Save the user's referrer URL to the database

// Increment the user count for the current day
database.ref("users_per_day/" + dateString).transaction(function(currentCount) {
  return (currentCount || 0) + 1;
});

function avo() {
  console.log("helow");
  database.ref("avocat/" + dateString).transaction(function(currentCount) {
    return (currentCount || 0) + 1;
  });
}

// --- URL Management ---
function updateQueryParameter() {
  // Get the text from the input
  let text = document.getElementById("srt").value;

  // Update the URL with the new query parameter
  window.history.pushState({}, "", `?text=${text}`);
  console.log(text);
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
  console.log("has valu" + urlParams.get("text"));
  document.getElementById("srt").value = urlParams.get("text");
  // st = document.getElementById("srt"); // No need to re-assign, already declared and assigned above
  // num = document.getElementById("ticketNum"); // No need to re-assign
  st.value = urlParams.get("text"); // Just set the value
  serch();
} else {
  document.getElementById("srt").value = "زواج عرفي";
  // st = document.getElementById("srt"); // No need to re-assign
  // num = document.getElementById("ticketNum"); // No need to re-assign
  st.value = "زواج عرفي"; // Just set the value
  serch();
}

// --- Element References --- (Declarations moved higher up)
// const bu = document.getElementById("btn");
// let st = document.getElementById("srt");
// let num = document.getElementById("ticketNum");
// let resp = document.getElementById("resp");
// const ex1 = document.getElementById("ex1");
// const ex2 = document.getElementById("ex2"); // Added missing reference
// const countrySelect = document.getElementById('countrySelect'); // Reference to the new dropdown
//data to save in firebase
var datares = "";
//list name for button to improve
buttonlistname = ["لا علاقة", "يتقارب قليلا في المعنى", "نفس المعنى لكن ليس مطابق", "المعنى مطابق للبحث"];

// --- Event Listeners ---
bu.addEventListener("click", serch);
ex1.addEventListener("change", cha);
ex2.addEventListener("change", cha2); // Added listener call
countrySelect.addEventListener('change', serch); // Trigger search on country change

document.addEventListener("click", function(e) {
  if (e.target.id == "nump") {
    num.value = e.target.innerHTML - 1;
    serch();
  }
});

function cha2() {
  // Use the global 'st' constant directly
  if (ex2.checked) {
    st.value = ex2.value; // Assign value to the global 'st' element
  } else {
    st.value = "";
  }
}

function cha() {
  // Use the global 'st' constant directly
  if (ex1.checked) {
    st.value = ex1.value; // Assign value to the global 'st' element
  } else {
    st.value = "";
  }
}

//send data to firebase
function send_res(even) {
  let reft = database.ref('serch_fr_train');
  reft.push({searchfor: st.value, res_data: datares[0], rel_valeu: even.target.id * 0.33});
  alert('تم اضافة التقييم بنجاح شكرا على المساعدة');
}

// --- Search Function ---
function serch() {
  // Ensure pagination is visible (if needed, seems related to nump element)
  let numpElement = document.getElementById("nump"); // Use let/const and get element inside function
  if (numpElement) { // Check if element exists
      numpElement.style.display = ""; // Or "block" or "flex" depending on desired layout
  } else {
      console.warn("Element with ID 'nump' not found.");
  }

  // --- Get Selected Country and API URL ---
  const selectedCountry = countrySelect.value;
  const apiUrl = apiUrls[selectedCountry] || apiUrls["Algeria"]; // Fallback to Algeria

  // --- Log Search to Firebase ---
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  let ref = database.ref('searchs');
  // Log country along with search
  ref.push({ searchfor: st.value, country: selectedCountry, date: dateTime });

  // --- Perform Search Fetch ---
  wrd = st.value;
  resp.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'; // Add loading indicator

  fetch(apiUrl, { // Use the dynamic apiUrl
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        wrd,
        num.value,
        -1 // Add the third parameter for general search type
      ]
    })
  })
  .then(r => r.json())
  .then(
    r => {
      let data = r.data;
      datares = data;
      resp.innerHTML = data;
      if (data != "لم نتمكن من ايجاد النتيجة اما لعدم وجود الاجتهاد او لعدم كتابة جملة بحث مناسبة") {
        //create button
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'col-12 ';
        buttonContainer.style = "background-color:white;";
        p = document.createElement('p');
        p.innerHTML = "ساهم في تحسين محرك البحث";
          
        buttonContainer.appendChild(p);
        for (var i = 0; i < 4; i++) {
          // Create a button
          var button = document.createElement('button');
          // Set the button's text
          button.className = "btn btn-primary";
          button.innerHTML = buttonlistname[i];
          button.id = i;
          button.addEventListener("click", send_res);
          // Add the button to the container
          buttonContainer.appendChild(button);
        }
          
        // Add the button container to the page
        resp.appendChild(buttonContainer);
      }
    }
  );
}

// Responsive/mobile-friendly enhancements
function makeMobileFriendly() {
  // Make all .btn-primary buttons full width on small screens
  if (window.innerWidth <= 600) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.classList.add('w-100');
      btn.style.marginBottom = '10px';
    });
    // Make all .form-control inputs full width
    document.querySelectorAll('.form-control').forEach(input => {
      input.classList.add('w-100');
    });
    // Add padding to #resp for better readability
    let respDiv = document.getElementById('resp');
    if (respDiv) respDiv.style.padding = '12px';
  } else {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.classList.remove('w-100');
      btn.style.marginBottom = '';
    });
    document.querySelectorAll('.form-control').forEach(input => {
      input.classList.remove('w-100');
    });
    let respDiv = document.getElementById('resp');
    if (respDiv) respDiv.style.padding = '';
  }
}
window.addEventListener('resize', makeMobileFriendly);
document.addEventListener('DOMContentLoaded', makeMobileFriendly);
