var towns = {
    town: [
      {
        "townName": "6/24 - Henderson, MN",
		 img: "./assets/images/henderson.jpg",
        "vehicleClass": [
          {
            name: "Mini rod - 1900A",
            "vehicles": [
				{"place": "1","puller": "Andrew Peterson","vehicle": "Mayhem","distance": "271.56"},
				{"place": "2","puller": "Matt Hargruth","vehicle": "Ford Racing","distance": "263.09"},
				{"place": "3","puller": "WAYNE CARRIGAN","vehicle": "HEART BEAT","distance": "235.1"},
           ]
          },
          {
            name: "Mini rod - 1900B",
            "vehicles": [
{"place": "1","puller": "Andrew Peterson","vehicle": "Mayhem","distance": "299.41"},
{"place": "2","puller": "Matt Hargruth","vehicle": "Ford Racing","distance": "266.7"},
{"place": "3","puller": "WAYNE CARRIGAN","vehicle": "HEART BEAT","distance": "238"},
]
          },
          {
            name: "Pro Stock - 1050",
            "vehicles": [
{"place": "1","puller": "Brett Kitchner","vehicle": "DISFUNCTIONAL","distance": "340.52"},
{"place": "2","puller": "Pat Schmitt","vehicle": "JD X500","distance": "294.13"},
{"place": "3","puller": "Pat Schmitt","vehicle": "JD140","distance": "137.01"},
]
          },
          {
            name: "Sport Stock - 1000",
            "vehicles": [
{"place": "---","puller": "Matt Creswick","vehicle": "Kamikaze","distance": "EXH - 253.72"},
            ]
          },
          {
            name: "Sport Stock - 1050",
            "vehicles": [
{"place": "---","puller": "Matt Creswick","vehicle": "Kamikaze","distance": "EXH - 122.21"},
            ]
          },
          {
            name: "Stock - 1050",
            "vehicles": [
{"place": "1","puller": "Jerry","vehicle": "Flirtin with Dirt","distance": "167.97"},
{"place": "2","puller": "Natalie Matejcek","vehicle": "Super Star","distance": "165.85"},
{"place": "3","puller": "Kaylyn Westerberg","vehicle": "Midnight Dreams","distance": "157.7"},
{"place": "4","puller": "Annabelle Jensen","vehicle": "side winder JR","distance": "151.68"},
{"place": "5","puller": "Abbie/Tara Larsen","vehicle": "Abracadabra","distance": "147.96"},
            ]
          },
          {
            name: "Stock - 950",
            "vehicles": [
{"place": "1","puller": "Brandon Matejcek","vehicle": "Super Star","distance": "257.85"},
{"place": "2","puller": "Abbie/Tara Larsen","vehicle": "Abracadabra","distance": "227.6"},
{"place": "3","puller": "Kaylyn Westerberg","vehicle": "Midnight Dreams","distance": "178.75"},
{"place": "4","puller": "Justin Roper","vehicle": "Roper 16T","distance": "170.86"},
{"place": "5","puller": "Annabelle Jensen","vehicle": "side winder JR","distance": "143.98"},
{"place": "6","puller": "Jerry","vehicle": "Flirtin with Dirt","distance": "104.1"},
            ]
          },
        /*  {
            name: "Stock Altered - 1050",
            "vehicles": [
              {"place":"1","puller":"Tony Katula","vehicle":"Nightrider","distance":"262.25","points":"20",},
              {"place":"2","puller":"Colton Burbank","vehicle":"Nut Job","distance":"201.23","points":"19",},
            ]
          },
          {
            name: "Stock Altered - 950",
            "vehicles": [
              {"place":"1","puller":"Tony Katula","vehicle":"Nightrider","distance":"261.32","points":"20",},
              {"place":"2","puller":"Colton Burbank","vehicle":"Nut Job","distance":"218.62","points":"19",},
            ]
          }, */
          {
            name: "Super Modified - 1100",
            "vehicles": [
{"place": "1","puller": "Cory Loidolt","vehicle": "Wicked Steel","distance": "316.67"},
{"place": "2","puller": "Matt Larsen","vehicle": "Always Somethin","distance": "244.69"},
{"place": "3","puller": "Andrew Peterson","vehicle": "Gambler","distance": "1.5"},
{"place": "---","puller": "Joel Larsen","vehicle": "Oliver Twist","distance": "DQ:Non-Tech"},
            ]
          },
          {
            name: "Super Modified - 1150",
            "vehicles": [
{"place": "1","puller": "Cory Loidolt","vehicle": "Wicked Steel","distance": "319.21"},
{"place": "2","puller": "Andrew Peterson","vehicle": "Maxed out","distance": "318.46"},
{"place": "3","puller": "Joel Larsen","vehicle": "Oliver Twist","distance": "269.09"},
{"place": "4","puller": "Matt Larsen","vehicle": "Always Somethin","distance": "240.2"},
            ]
          },
          {
            name: "Super Modified - 1250",
            "vehicles": [
{"place": "1","puller": "Cory Loidolt","vehicle": "Wicked Steel","distance": "281.08"},
{"place": "2","puller": "Andrew Peterson","vehicle": "Maxed out","distance": "279.27"},
{"place": "3","puller": "Lina Matejcek","vehicle": "Silver Star","distance": "278.33"},
{"place": "4","puller": "Ray Matejcek","vehicle": "Slayer","distance": "276.67"},
{"place": "---","puller": "Kasey Matejcek","vehicle": "Fire Fly","distance": "DQ:Non-Tech"},
            ]
          },
          {
            name: "Super Modified - 1400",
            "vehicles": [
{"place": "1","puller": "Kasey Matejcek","vehicle": "Fire Fly","distance": "331.9"},
{"place": "2","puller": "Ray Matejcek","vehicle": "Slayer","distance": "310.71"},
{"place": "3","puller": "Andrew Peterson","vehicle": "Maxed out","distance": "297.08"},
            ]
          },
          {
            name: "Super Stock - 1050",
            "vehicles": [
{"place": "1","puller": "Brett Kitchner","vehicle": "DISFUNCTIONAL","distance": "226.36"},
{"place": "2","puller": "Pat Schmitt","vehicle": "JD X500","distance": "199.38"},
{"place": "3","puller": "Pat Schmitt","vehicle": "JD140","distance": "187.34"},
            ]
          },
        ]
      },
          ]
  };


/* Town & VehicleClass template
{
  "townName": "West Concord",
  "vehicleClass": [
    {
      name: "Mini rod - 1900A",
      "vehicles": [
      ]
    },
    {
      name: "Mini rod - 1900B",
      "vehicles": [
      ]
    },
    {
      name: "Pro Stock - 1050",
      "vehicles": [
      ]
    },
    {
      name: "Sport Stock - 1000",
      "vehicles": [
      ]
    },
    {
      name: "Sport Stock - 1050",
      "vehicles": [
      ]
    },
    {
      name: "Stock - 1050",
      "vehicles": [
      ]
    },
    {
      name: "Stock - 950",
      "vehicles": [
      ]
    },
    {
      name: "Stock Altered - 1050",
      "vehicles": [
      ]
    },
    {
      name: "Stock Altered - 950",
      "vehicles": [
      ]
    },
    {
      name: "Super Modified - 1100",
      "vehicles": [
      ]
    },
    {
      name: "Super Modified - 1150",
      "vehicles": [
      ]
    },
    {
      name: "Super Modified - 1250",
      "vehicles": [
      ]
    },
    {
      name: "Super Modified - 1400",
      "vehicles": [
      ]
    },
    {
      name: "Super Stock - 1050",
      "vehicles": [
      ]
    },
  ]
}, */
