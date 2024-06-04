let map;

function geocodeAddress(address, name, objectId, objectInfo) {
  const apiKey =
    "AjJltzuvBIl2AgIq1BCGUhKoQvxvG1kTFg-8bSmoXpYDvVxGLqpM0kGpcoL9Ty0I";
  const url =
    "https://dev.virtualearth.net/REST/v1/Locations/" +
    encodeURIComponent(address) +
    "?key=" +
    apiKey;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const coordinates = data.resourceSets[0].resources[0].point.coordinates;
      const latitude = coordinates[0];
      const longitude = coordinates[1];
      displayMap(latitude, longitude, name, objectId, objectInfo);
    })
    .catch((error) => console.log("Error geocoding address:", error));
}

function initMap() {
  map = new Microsoft.Maps.Map(document.getElementById("map"), {
    credentials:
      "AjJltzuvBIl2AgIq1BCGUhKoQvxvG1kTFg-8bSmoXpYDvVxGLqpM0kGpcoL9Ty0I",
    zoom: 15,
  });
}

function displayMap(latitude, longitude, name, objectId, objectInfo) {
  const location = new Microsoft.Maps.Location(latitude, longitude);

  let pin;

  if (objectInfo["worth"] > 100) {
    pin = new Microsoft.Maps.Pushpin(location, {
      title: name,
      color: "red",
    });
  } else if (objectInfo["worth"] < 50) {
    pin = new Microsoft.Maps.Pushpin(location, {
      title: name,
      color: "blue",
    });
  } else {
    pin = new Microsoft.Maps.Pushpin(location, {
      title: name,
      color: "green",
    });
  }

  Microsoft.Maps.Events.addHandler(pin, "click", function () {
    displayLocationInfo(
      objectId,
      objectInfo["title"],
      objectInfo["description"],
      objectInfo["worth"],
    );
  });

  map.entities.push(pin);
  map.setView({ center: location, zoom: 15 });
}

function displayLocationInfo(objectId, title, description, worth) {
  let info_object = document.querySelector(".objectInfo");

  info_object.innerHTML = `

           <div class="x" id='objinfox'>
               &times;
           </div>


           <h1>${title}</h1>

           <b>Description:</b> <p>
               ${description}
           </p>

           <b>Worth:</b> <span>${worth} points</span>
           `;

  info_object.style.display = "block";
  info_object.style.animation = "fadeInLeft 1s";

  document.querySelector("#objinfox").addEventListener("click", (event) => {
    let objectInfo = document.querySelector(".objectInfo");
    info_object.style.animation = "fadeOutLeft 1s";
    setTimeout(() => {
      objectInfo.style.display = "none";
    }, 1000);

    console.log("X Clicked");
  });
}

function loadMapScenario() {
  initMap();

  /* Below are where the actual points go */

  geocodeAddress(
    "460 W Western Ave, Muskegon, MI 49440",
    "Work-out Session",
    1,
    {
      title: "Work-out Session",
      description:
        "This is a 30 minute work out session. Join us here to get fit!",
      worth: 30,
    },
  );

  geocodeAddress(
    "5710 McClellan Ave, Detroit, MI 48213",
    "Mom's in the Making",
    2,
    {
      title: "Mom's in the Making",
      description:
        "This class is for Pregnant Moms! Get your game on and have fun rolling around in style... come in yoga pants!",
      worth: 400,
    },
  );

  geocodeAddress("Nashua Dr, Detroit, MI 48207", "Run this Track", 1, {
    title: "Run this Track",
    description:
      "Enjoy a quick run around this track. You get points each time you complete the track loop.",
    worth: 10,
  });

  geocodeAddress("123 S Washington Sq, Lansing, MI 48933", "Morning Yoga", 1, {
    title: "Morning Yoga",
    description:
      "Start your day with a refreshing morning yoga session. Perfect for all skill levels!",
    worth: 25,
  });

  geocodeAddress(
    "150 W Jefferson Ave, Detroit, MI 48226",
    "Downtown Bike Ride",
    2,
    {
      title: "Downtown Bike Ride",
      description:
        "Join us for a scenic bike ride through downtown Detroit. Bring your bike and helmet!",
      worth: 50,
    },
  );

  geocodeAddress(
    "1350 W Lake Lansing Rd, East Lansing, MI 48823",
    "Lakeside Tai Chi",
    1,
    {
      title: "Lakeside Tai Chi",
      description:
        "Relax and rejuvenate with a Tai Chi session by the lake. Suitable for beginners and pros alike.",
      worth: 30,
    },
  );

  geocodeAddress("1501 E River Rd, Flint, MI 48503", "Riverfront Jog", 1, {
    title: "Riverfront Jog",
    description:
      "Enjoy a refreshing jog along the riverfront. Track your laps and earn points!",
    worth: 20,
  });

  geocodeAddress(
    "301 N Washington St, Ypsilanti, MI 48197",
    "Pilates in the Park",
    2,
    {
      title: "Pilates in the Park",
      description:
        "Join us for a Pilates session in the park. Bring a mat and enjoy the outdoors!",
      worth: 35,
    },
  );

  geocodeAddress(
    "111 N State St, Ann Arbor, MI 48104",
    "University Fitness Challenge",
    1,
    {
      title: "University Fitness Challenge",
      description:
        "Take part in the University Fitness Challenge! Compete in various fitness tasks and win rewards.",
      worth: 40,
    },
  );

  geocodeAddress(
    "240 W Grand River Ave, Brighton, MI 48116",
    "Brighton Bootcamp",
    2,
    {
      title: "Brighton Bootcamp",
      description:
        "Join us for an intense bootcamp session. All fitness levels welcome!",
      worth: 45,
    },
  );

  geocodeAddress(
    "200 W Michigan Ave, Kalamazoo, MI 49007",
    "Kalamazoo Kickboxing",
    1,
    {
      title: "Kalamazoo Kickboxing",
      description:
        "Learn the basics of kickboxing in this high-energy class. Gloves provided!",
      worth: 50,
    },
  );

  geocodeAddress(
    "2250 S Industrial Hwy, Ann Arbor, MI 48104",
    "Indoor Climbing Session",
    2,
    {
      title: "Indoor Climbing Session",
      description:
        "Challenge yourself with an indoor climbing session. All gear included.",
      worth: 60,
    },
  );

  geocodeAddress(
    "100 N Capitol Ave, Lansing, MI 48933",
    "Capitol Steps Workout",
    1,
    {
      title: "Capitol Steps Workout",
      description:
        "Get fit with a workout session on the steps of the Capitol. Cardio and strength training combined.",
      worth: 30,
    },
  );

  geocodeAddress(
    "2100 Woodward Ave, Detroit, MI 48201",
    "Comerica Park Workout",
    2,
    {
      title: "Comerica Park Workout",
      description:
        "Join us for a workout session at Comerica Park. Enjoy the great outdoors and get fit!",
      worth: 40,
    },
  );

  geocodeAddress("925 S Main St, Royal Oak, MI 48067", "Royal Oak Zumba", 1, {
    title: "Royal Oak Zumba",
    description:
      "Dance your way to fitness with a fun Zumba class. All levels welcome!",
    worth: 25,
  });

  geocodeAddress(
    "303 Monroe St, Detroit, MI 48226",
    "Greektown Walking Tour",
    1,
    {
      title: "Greektown Walking Tour",
      description:
        "Enjoy a guided walking tour through Greektown while burning some calories.",
      worth: 15,
    },
  );

  geocodeAddress(
    "1903 Western Ave, Grand Rapids, MI 49506",
    "Grand Rapids CrossFit",
    2,
    {
      title: "Grand Rapids CrossFit",
      description:
        "Push your limits with a high-intensity CrossFit session. Suitable for all fitness levels.",
      worth: 50,
    },
  );

  geocodeAddress(
    "2000 Fuller Rd, Ann Arbor, MI 48105",
    "Fuller Park Tennis",
    1,
    {
      title: "Fuller Park Tennis",
      description:
        "Enjoy a game of tennis at Fuller Park. Bring your racket and enjoy the game!",
      worth: 20,
    },
  );

  geocodeAddress(
    "1 Campus Martius, Detroit, MI 48226",
    "Campus Martius Ice Skating",
    2,
    {
      title: "Campus Martius Ice Skating",
      description:
        "Enjoy a fun ice skating session at Campus Martius. Skate rentals available.",
      worth: 30,
    },
  );

  geocodeAddress(
    "300 Ottawa Ave NW, Grand Rapids, MI 49503",
    "Downtown GR Yoga",
    1,
    {
      title: "Downtown GR Yoga",
      description:
        "Join us for a relaxing yoga session in downtown Grand Rapids. Perfect for all skill levels.",
      worth: 25,
    },
  );

  geocodeAddress(
    "200 W Michigan Ave, Jackson, MI 49201",
    "Jackson Cycling Club",
    2,
    {
      title: "Jackson Cycling Club",
      description:
        "Join the Jackson Cycling Club for a group ride. All levels of cyclists welcome!",
      worth: 35,
    },
  );

  geocodeAddress(
    "2111 Porter St SW, Grand Rapids, MI 49519",
    "Yoga on the Green",
    1,
    {
      title: "Yoga on the Green",
      description:
        "Experience a peaceful yoga session on the green. Perfect for relaxation and fitness.",
      worth: 30,
    },
  );

  geocodeAddress(
    "2301 Bellevue St, Detroit, MI 48207",
    "Belle Isle Running Club",
    2,
    {
      title: "Belle Isle Running Club",
      description:
        "Join the running club at Belle Isle for a scenic run. Suitable for all running levels.",
      worth: 20,
    },
  );

  geocodeAddress(
    "1200 S Franklin St, Mt Pleasant, MI 48859",
    "CMU Fitness Bootcamp",
    1,
    {
      title: "CMU Fitness Bootcamp",
      description:
        "Get in shape with the CMU Fitness Bootcamp. High-energy workouts for all levels.",
      worth: 45,
    },
  );

  geocodeAddress(
    "300 S 4th Ave, Ann Arbor, MI 48104",
    "Ann Arbor Dance Fitness",
    2,
    {
      title: "Ann Arbor Dance Fitness",
      description:
        "Dance your way to fitness with this energetic dance fitness class. All levels welcome!",
      worth: 30,
    },
  );

  geocodeAddress("500 S State St, Ann Arbor, MI 48109", "U of M Track Run", 1, {
    title: "U of M Track Run",
    description:
      "Enjoy a run on the University of Michigan track. Track your laps and earn points!",
    worth: 15,
  });

  geocodeAddress(
    "100 Monroe St NW, Grand Rapids, MI 49503",
    "GR Core Strength",
    2,
    {
      title: "GR Core Strength",
      description:
        "Build your core strength with this focused workout session. All levels welcome!",
      worth: 35,
    },
  );

  geocodeAddress(
    "400 Renaissance Center, Detroit, MI 48243",
    "Renaissance Center Stairs",
    1,
    {
      title: "Renaissance Center Stairs",
      description:
        "Get a great workout climbing the stairs at the Renaissance Center. Track your progress!",
      worth: 25,
    },
  );

  geocodeAddress(
    "200 N Main St, Royal Oak, MI 48067",
    "Royal Oak Bootcamp",
    2,
    {
      title: "Royal Oak Bootcamp",
      description:
        "Join us for an intense bootcamp session in Royal Oak. All fitness levels welcome!",
      worth: 40,
    },
  );

  geocodeAddress(
    "1983 N University Ct, Ann Arbor, MI 48109",
    "Ann Arbor Martial Arts",
    1,
    {
      title: "Ann Arbor Martial Arts",
      description:
        "Learn the basics of martial arts in this introductory class. All levels welcome!",
      worth: 50,
    },
  );

  geocodeAddress(
    "2500 Packard St, Ann Arbor, MI 48104",
    "Packard St Rollerblading",
    2,
    {
      title: "Packard St Rollerblading",
      description:
        "Enjoy a fun rollerblading session on Packard Street. Bring your blades and safety gear!",
      worth: 30,
    },
  );

  geocodeAddress("1 Hart Plaza, Detroit, MI 48226", "Hart Plaza Aerobics", 1, {
    title: "Hart Plaza Aerobics",
    description:
      "Join us for an energetic aerobics session at Hart Plaza. All fitness levels welcome!",
    worth: 20,
  });

  geocodeAddress(
    "2901 Wabash Rd, Lansing, MI 48910",
    "Lansing Kayak Adventure",
    2,
    {
      title: "Lansing Kayak Adventure",
      description:
        "Experience a kayaking adventure on the Lansing River. All equipment provided.",
      worth: 60,
    },
  );
}

$(document).ready(() => {
  $(".settingsIcon").on("click", () => {
    openSettingsMenu();
  });
});

/////////////////////////////////////////////////////////////////////////////

let openSettingsMenu = () => {
  let setMenu = document.querySelector(".settingsMenu");

  setMenu.style.animation = "fadeIn 1s";
  setMenu.style.display = "flex";

  document.querySelector("#setmenux").addEventListener("click", (event) => {
    const objectInfo = document.querySelector(".settingsMenu");
    setMenu.style.animation = "fadeOut 1s";
    setTimeout(() => {
      objectInfo.style.display = "none";
    }, 1000);

    console.log("X Clicked");
  });
};
