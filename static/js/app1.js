// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // clearing out any existing data
  tbody.html("");

  data.forEach((dataRow) => {
    let row = tbody.append("tr");
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filterTracker = {}; 

// 3. Use this function to update the filters. 
function updateFilters() {
  let deltaElement  = d3.select(this);
  let elementValue = deltaElement.property("value");
  let filterId = deltaElement.property("id");
  //If a filter value was entered then add that filterId and value
  if (elementValue) {
    filterTracker[filterId] = elementValue;
  } else {
    delete filterTracker[filterId];
  }
   //Calling function to apply all filters and rebuild the table
  filterTable();
  
  function filterTable() {
    filteredData = tableData;
    Object.entries(filterTracker).map(([key, value]) => {
      filteredData = filteredData.filter(row => row[key]=== value);
    })
  buildTable(filteredData)
  };
};
// An event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);
  
// Build the table when the page loads
buildTable(tableData);
