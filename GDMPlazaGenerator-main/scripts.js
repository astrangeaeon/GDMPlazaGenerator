var dataset1
fetch('./GDMSource.json')
    .then((response) => response.json())
    .then((json) => dataset1 = json);
console.log(dataset1);
