const fetchPromise = fetch("nzbird.json");
fetchPromise
  .then(function (response) {
    if (!response.ok) {
      throw new error("HTTP error${response.status}");
    }
    return response.json();
  })
  .then(function (data) {
    for (i = 0; i < data.length; i++) {
      display(data[i]);
    }

    //search function
    let e = document.querySelector(".search");
    let select = document.querySelector(".select1");

    let temp = document.querySelector(".select2");

    function search(eventData) {
      // KEEP THIS. It prevents the page from reloading
      eventData.preventDefault();

      console.log("something happened!!!!!!!!!!!!!!");
      let status = select.options[select.selectedIndex].text;
      let sort = temp.options[temp.selectedIndex].text;
      let str = e.value.toLowerCase();
      let conser_holder = [];

      if (status === "ALL" && sort === "Default" && str != "") {
        // only search function
        clean();
        console.log(str);
        // for (i = 0; i < data.length; i++) {
        //   display(data[i]);
        // }
        search(data);
      } else if (status != "ALL" && sort === "Default" && str === "") {
        //only  status function
        clean();
        conservation(data);
        for (i = 0; i < conser_holder.length; i++) {
          display(conser_holder[i]);
        }
      } else if (status === "ALL" && sort != "Default" && str === "") {
        //only sorting function
        clean();
        sorting(data);
      } else if (status != "ALL" && sort != "Default" && str === "") {
        clean();
        conservation(data);
        sorting(conser_holder);
      } else if (status != "ALL" && sort != "DEfault" && str != "") {
        clean();
        document.querySelector(".select1").selectedIndex = 0;
        document.querySelector(".select2").selectedIndex = 0;
        search(data);
      } else {
        for (i = 0; i < data.length; i++) {
          display(data[i]);
        }
      }
      async function search(data) {
        //find match;
        for (i = 0; i < data.length; i++) {
          // console.log(data[i].other_names.length);
          for (c = 0; c < data[i].other_names.length; c++) {
            console.log(str === data[i].scientific_name.toLowerCase());
            if (
              str === data[i].other_names[c].toLowerCase() ||
              str === data[i].primary_name.toLowerCase() ||
              str === data[i].english_name.toLowerCase() ||
              str === data[i].scientific_name.toLowerCase()
            ) {
              console.log(str);
              display(data[i]);
              break;
            }
          }
          if (str === "") {
            display(data[i]);
            //console.log(i);
          }
        }
      }
      async function conservation(data) {
        for (i = 0; i < data.length; i++) {
          if (status === data[i].status) {
            // display(data[i]);
            conser_holder.push(data[i]);
          }
        }
        // if (conser_holder.length < 2) {
        //   display(conser_holder[0]);
        // } else {
        return conser_holder;
        // }
      }
      async function sorting(data) {
        console.log(data);
        let new_array = data;
        let f = 0;
        let r = 0;
        if (sort === "Lightest to heaviest") {
          let weight_array = [];
          for (i = 0; i < data.length; i++) {
            weight_array.push(data[i].size.weight.value);
          }
          weight_array.sort(function (a, b) {
            return a - b;
          });
          while (r < new_array.length && f < weight_array.length) {
            if (new_array[r].size.weight.value === weight_array[f]) {
              // console.log(new_array[r]);
              display(new_array[r]);
              f++;
            }
            r++;
            if (r === new_array.length && f != weight_array.length) {
              r = 0;
            }
          }
        } else if (sort === "Shortest to longest") {
          let length_array = [];
          for (i = 0; i < data.length; i++) {
            length_array.push(data[i].size.length.value);
          }
          length_array.sort(function (a, b) {
            return a - b;
          });
          // console.log(length_array);
          while (r < new_array.length && f < length_array.length) {
            if (new_array[r].size.length.value === length_array[f]) {
              // console.log(new_array[r]);
              display(new_array[r]);
              f++;
              //console.log(f);
            }
            r++;
            if (r === new_array.length && f != length_array.length) {
              r = 0;
            }
          }
        }
      }
    }
    let btnRef = document.querySelector(".filter-result");
    btnRef.addEventListener("click", search);

    // display function except it to display all data that pass it in
  })
  .catch(function (error) {});

async function clean() {
  let m = document.querySelector(".main-block");
  let child = m.lastElementChild;

  while (child) {
    m.removeChild(child);
    child = m.lastChild;
  }
}

async function display(data) {
  //create new element for html
  let block = document.createElement("div");
  let image = document.createElement("img");
  let mName = document.createElement("p"); // pass
  let credit = document.createElement("p"); //pass
  let ename = document.createElement("p"); // pass
  let sname = document.createElement("p"); // pass
  let family = document.createElement("p"); // pass
  let order = document.createElement("p"); // pass
  let status = document.createElement("p"); // pass
  let length = document.createElement("p"); // pass
  let weight = document.createElement("p"); //pass
  let circle = document.createElement("div"); //unsure

  mName.textContent = data.primary_name; // get mario name from json
  mName.setAttribute("class", "mName");

  ename.textContent = data.english_name;
  ename.setAttribute("class", "ename");

  family.textContent = "Family: " + data.family;
  family.setAttribute("class", "family");

  order.textContent = "Order:  " + data.order;
  order.setAttribute("class", "order");

  status.textContent = "Status    : " + data.status;
  status.setAttribute("class", "status");

  sname.textContent = "Scientific Name: " + data.scientific_name;
  sname.setAttribute("class", "sname");

  length.textContent =
    "Length:" + data.size.length.value + " " + data.size.length.units;
  length.setAttribute("class", "length");

  weight.textContent =
    "Weight:" + data.size.weight.value + " " + data.size.weight.units;
  weight.setAttribute("class", "weight");

  credit.textContent = data.photo.credit;
  credit.setAttribute("class", "credit");

  //circle.textContent = data[i].status;
  circle.setAttribute("class", "circle");
  if (data.status == "Not Threatened") {
    circle.style.backgroundColor = "#02a028";
  } else if (data.status == "Naturally Uncommon") {
    circle.style.backgroundColor = "#649a31";
  } else if (data.status == "Relict") {
    circle.style.backgroundColor = "#99cb68";
  } else if (data.status == "Recovering") {
    circle.style.backgroundColor = "#fecc33";
  } else if (data.status == "Declining") {
    circle.style.backgroundColor = "#fe9a01";
  } else if (data.status == "Nationally Increasing") {
    circle.style.backgroundColor = "#c26967";
  } else if (data.status == "Nationally Vulnerable") {
    circle.style.backgroundColor = "#9b0000";
  } else if (data.status == "Nationally Endangered") {
    circle.style.backgroundColor = "#660032";
  } else if (data.status == "Nationally Critical") {
    circle.style.backgroundColor = "#320033";
  } else {
    circle.style.backgroundColor = "black";
  }
  image.contentType = "image/jpeg";
  image.src = data.photo.source;
  image.alt = data.english_name;
  image.setAttribute("class", "photo");

  block.append(image);
  block.append(mName);
  block.append(credit);
  block.append(ename);
  block.append(sname);
  block.append(family);
  block.append(order);
  block.append(status);
  block.append(length);
  block.append(weight);
  block.append(circle);

  block.setAttribute("class", "block");

  let parent = document.querySelector(".main-block");
  parent.append(block);
}
