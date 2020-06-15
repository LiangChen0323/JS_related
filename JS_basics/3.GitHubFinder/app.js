const github = new GitHub;
const ui = new UI;
// Search input
const searchUser = document.getElementById("searchUser");

// Search input event listener
searchUser.addEventListener("keyup", (e) => {
  const userTest = e.target.value;
  if (userTest !== "") {
    // make http call
    github.getUser(userTest)
      .then(data => {
        if (data.profile.message == "Not Found") {
          // show alert
          ui.showAlert("User not found", "alert alert-danger");
        } else {
          // Show profile
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        };
      })
  } else {
    // Clear profile
    ui.clearProfile();
  }
})
