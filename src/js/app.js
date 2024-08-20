import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Dynamically set the full name, role, and location
  let fullName = `${variables.name || "First Name"} ${variables.lastName ||
    "Last Name"}`;
  let role = variables.role || "Role";
  let location = `${variables.city || "City"}, ${variables.country ||
    "Country"}`;

  // Set the social media bar position dynamically
  let socialMediaClass = `position-${variables.socialMediaPosition}`;

  // Render social media links only if the corresponding username is provided
  let socialLinks = `
    ${
      variables.twitter
        ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
        : ""
    }
    ${
      variables.github
        ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
        : ""
    }
    ${
      variables.linkedin
        ? `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
        : ""
    }
    ${
      variables.instagram
        ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
        : ""
    }
  `;

  // Reset the website body with the new HTML output
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${role}</h2>
      <h3>${location}</h3>
      <ul class="${socialMediaClass}">
        ${socialLinks}
      </ul>
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://wallpaperaccess.com/full/3867780.jpg",
    avatarURL: "https://pngimg.com/uploads/mandalorian/mandalorian_PNG23.png",
    socialMediaPosition: null,
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
