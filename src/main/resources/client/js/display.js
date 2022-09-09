function getAllCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cities",
        success: function (data) {
            let table = document.getElementById("list");
            if (table.style.display === "none") {
                table.style.display = "block"
                document.getElementById("form").style.display = "none"
            }
            document.getElementById("list").innerHTML = displayTable(data)
        }

    })
}

function displayTable(data) {
    let result = ""
    result += "<table border='1' width='300px'>"
    result += "<tr>"
    result += "<th>STT</th>"
    result += "<th>Name City</th>"
    result += "<th>Area</th>"
    result += "<th>Population</th>"
    result += "<th>GDP</th>"
    result += "<th>Description</th>"
    result += "<th>Country</th>"
    result += "<th colspan='3'>Action</th>"
    result += "</tr>"
    for (let i = 0; i < data.length; i++) {
        result += "<tr>"
        result += "<th>" + (i + 1) + "</th>"
        result += "<th>" + data[i].name + "</th>"
        result += "<th>" + data[i].area + "</th>"
        result += "<th>" + data[i].population + "</th>"
        result += "<th>" + data[i].gdp + "</th>"
        result += "<th>" + data[i].description + "</th>"
        result += "<th>" + data[i].country.name + "</th>"
        result += "<th><button onclick='update(" + data[i].id + ")'>Update</button></th>"
        result += "<th><button onclick='testConfirm(" + data[i].id + ")'>Delete</button></th>"
        result += "<th><button onclick='detail(" + data[i].id + ")'>Detail</button></th>"
        result += "</tr>"

    }
    result += "</table>"
    return result
}

function displayDetail(data) {
    let result = ""
    result += "<table border='1' width='300px'>"
    result += "<tr>"
    result += "<th>Name City</th>"
    result += "<th>Area</th>"
    result += "<th>Population</th>"
    result += "<th>GDP</th>"
    result += "<th>Description</th>"
    result += "<th>Country</th>"
    result += "</tr>"
    result += "<th>" + data.name + "</th>"
    result += "<th>" + data.area + "</th>"
    result += "<th>" + data.population + "</th>"
    result += "<th>" + data.gdp + "</th>"
    result += "<th>" + data.description + "</th>"
    result += "<th>" + data.country.name + "</th>"
    result += "</tr>"
    result += "</table>"
    return result
}


function formCreate(data) {
    let result = ""
    result += "<form>"
    result += "<table>"
    result += "<tr>"
    result += "<th>Name City</th>"
    result += "<td><label><input type='text' id='name'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Area</th>"
    result += "<td><label><input type='text' id='amount'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Population</th>"
    result += "<td><label><input type='text' id='population'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>GDP</th>"
    result += "<td><label><input type='text' id='gdp'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Description</th>"
    result += "<td><label><input type='text' id='description'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>City</th>"
    result += "<td><select id='select'>"
    for (let i = 0; i < data.length; i++) {
        result += "<option value=" + data[i].id + ">" + data[i].name + "</option>"
    }
    result += "</select>"
    result += "</td>"
    result += "</tr>"
    result += " <tr>"
    result += "<td colspan='2'>"
    result += "<button id='button' onclick='CreateCity()'>Create</button>"
    result += "</td>"
    result += "</tr>"
    result += "</table>"
    result += "</form>"
    result += "</div>"
    document.getElementById("list").style.display = "none"
    return result
}

let idCity;

function update(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/countries/",
        success: function (data) {
            document.getElementById("form").innerHTML = formUpdate(data)
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/cities/" + id,
                success: function (data) {
                    document.getElementById("id").value = data.id
                    document.getElementById("name").value = data.name
                    document.getElementById("area").value = data.area
                    document.getElementById("population").value = data.population
                    document.getElementById("gdp").value = data.gdp
                    document.getElementById("description").value = data.description
                }
            })
        }
    })
}

function detail(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cities/" + id,
        success: function (data) {
            document.getElementById("list").innerHTML = displayDetail(data)
        }
    })
}

function formUpdate(data) {
    let result = ""
    result += "<form>"
    result += "<table>"
    result += "<tr>"
    result += "<th>ID</th>"
    result += "<td><label><input type='text' id='id' readonly></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Name</th>"
    result += "<td><label><input type='text' id='name'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Area</th>"
    result += "<td><label><input type='text' id='area'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Population</th>"
    result += "<td><label><input type='text' id='population'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>GDP</th>"
    result += "<td><label><input type='text' id='gdp'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Description</th>"
    result += "<td><label><input type='text' id='description'></label></td>"
    result += "</tr>"
    result += "<tr>"
    result += "<th>Country</th>"
    result += "<td><select id='select'>"
    for (let i = 0; i < data.length; i++) {
        result += "<option value=" + data[i].id + ">" + data[i].name + "</option>"
    }
    result += "</select>"
    result += "</td>"
    result += "</tr>"
    result += " <tr>"
    result += "<td colspan='2'>"
    result += "<button id='button' onclick='updateCity()'>Update</button>"
    result += "</td>"
    result += "</tr>"
    result += "</table>"
    result += "</form>"
    result += "</div>"
    document.getElementById("form").style.display = "block"
    document.getElementById("list").style.display = "none"
    return result
}

function deleteCity(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/cities/" + id,
    }).done(function (response) {
        getAllCity()
        console.log(response)
    })
}
function testConfirm(id) {
    let result = confirm("Bạn có chắc chắn muốn xóa?")
    if (result) {
        deleteCity(id)
    }
}
function updateCity() {
    let id = $('#id').val()
    let name = $('#name').val()
    let area = $('#area').val()
    let population = $('#population').val()
    let gdp = $('#gdp').val()
    let description = $('#description').val()
    let country = $('#select').val()

    let City = {
        id: id,
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        description: description,
        country: {
            id: country
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/cities/" + id,
        data: JSON.stringify(City),
        success: function () {
            getAllCity()
            // document.getElementById("form").style.display = "none"
        }
    })
    event.preventDefault()

}


function CreateCity() {
    let id = $('#id').val()
    let name = $('#name').val()
    let area = $('#area').val()
    let population = $('#population').val()
    let gdp = $('#gdp').val()
    let description = $('#description').val()
    let country = $('#select').val()
    let City = {
        id: id,
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        description: description,
        country: {
            id: country
        }
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/cities",
        data: JSON.stringify(City),
        success: getAllCity
    })
    event.preventDefault()
}


function getAllCountry() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/countries",
        success: function (data) {
            document.getElementById("form").innerHTML = formCreate(data)
            document.getElementById("form").style.display = "block"
        }
    })
}