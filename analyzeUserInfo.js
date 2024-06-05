// This is the file to analyze the user info and get the users log in info.

$(document).ready(() => {
  const info = getUserInfo();
  if (!info) {
    document.querySelector(".infoAboutUser").innerHTML = `
     <p>
        Unfortunately, you are not signed in. Sign in below!
     </p>

     <button onclick="googleSignIn()" class="googleLogin">
          Login with Google
     </button>
      `;
  } else {
    let user_name = info["displayName"];
    document.querySelector(".infoAboutUser").innerHTML = `
      <p>
          Welcome, ${user_name}!
      </p>`;

    if (
      info["email"] == "brycenweeks10@gmail.com" ||
      info["email"] == "brendanjp04@gmail.com"
    ) {
      document.querySelector(".infoAboutUser").innerHTML += `
      You are an admin. View the <a href='/admin.html'>admin page.</a>`;
    }
  }
});
