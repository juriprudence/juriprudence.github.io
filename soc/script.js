// Initialize Firebase (replace with your project's configuration)
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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const confirmPassword = document.getElementById('confirmPassword');
const errorMessage = document.querySelector('.error-message');

// Login Functionality
if(loginForm)
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
       const user = userCredential.user;

      // Check if user's email is verified before redirecting
      if (user.emailVerified) {
        console.log('Logged in!');
        window.location.href = '/index.html'; // Redirect to index page
      } else {
        errorMessage.textContent = 'Please verify your email address to proceed.';
      }
    })
    .catch((error) => {
      errorMessage.textContent = handleLoginError(error);
    });
});

if(registerForm)

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = registerEmail.value;
  const password = registerPassword.value;
  const confirmPasswordValue = confirmPassword.value;

  if (password !== confirmPasswordValue) {
    errorMessage.textContent = 'Passwords do not match.';
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User created, send email verification
      console.log('User created!');
      const user = userCredential.user;
      user.sendEmailVerification().then(() => {
        // Email verification sent, display success message
        errorMessage.textContent = 'A verification email has been sent to your address. Please verify to proceed.';
      }).catch((error) => {
        errorMessage.textContent = handleEmailVerificationError(error);
      });
    })
    .catch((error) => {
      errorMessage.textContent = handleSignupError(error);
    });
});

// Error Handling Functions (replace with more specific handling if needed)
function handleLoginError(error) {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Incorrect email or password.';
    case 'auth/user-not-found':
      return 'User not found.';
    default:
      return 'Login failed.';
  }
}

function handleSignupError(error) {
  switch (error.code) {
    case 'auth/weak-password':
      return 'Password is too weak.';
    case 'auth/email-already-in-use':
      return 'Email address already in use.';
    default:
      return 'Registration failed.';
  }
}

function handleEmailVerificationError(error) {
  console.error('Error sending email verification:', error);
  return 'An error occurred while sending email verification.';
}
