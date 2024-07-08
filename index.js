const fs = require('fs')

const distictpost = async () => {
    const newdata = [];

    const distictdata = await fetch(
      "https://raw.githubusercontent.com/fahimreza-dev/bangladesh-geojson/master/bd-districts.json"
    )
      .then((res) => res.json())
      .then((res) => res?.districts);

    const statedata = await fetch(
      "https://raw.githubusercontent.com/fahimreza-dev/bangladesh-geojson/master/bd-postcodes.json"
    )
      .then((res) => res.json())
      .then((res) => res?.postcodes);   

      distictdata.map((disc) => {
        statedata.map((state) => {
          if (state?.district_id === disc?.id) {
            newdata.push({ ...state, district_name: disc?.name });
          }
        });
      });

      let newData = JSON.stringify(newdata);
      fs.writeFile("data1.json", newData, (err) => {
        if (err) throw err;
        console.log("New data added");
      }); 
}

// distictpost()

let data = fs.readFileSync("data.json");
let myObject = JSON.parse(data);

console.log(myObject.length);



