const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyc2F3c3R5dm5lanN3ZHhuYmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MjY2NzQsImV4cCI6MjAxMTMwMjY3NH0.2gu0jOhlVsgpiMWDf75i0YxdEQVh5inMc-gJ1DL7xMY";

const url = "https://brsawstyvnejswdxnbks.supabase.co";

const database = supabase.createClient(url, key);

let save = document.querySelector("#save");
save.addEventListener("click", async (e) => {
    e.preventDefault();
    let task = document.querySelector("#task").value;
    // let status = document.querySelector("#status").value;
    // let age = document.querySelector("#age").value;
    // let country = document.querySelector("#country").value;
    save.innerText = "Saveing....";
    save.setAttribute("disabled", true);
    let res = await database.from("todo").insert({
        task,
        status: false
        // status: false
        // age: age,
        // country: country
    })
    if (res) {
        // alert("Student Add Successfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
        task = "";
        // status: "";
        // age = "";
        // country = "";
        getStudent();
        getTotalCount();


    } else {
        alert("Student Not Add Successfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
    }
})

const getStudent = async () => {
    let tbody = document.getElementById("tbody");
    let loading = document.getElementById("loading");
    let tr = "";
    loading.innerText = "Loadding...."
    const res = await database.from("todo").select("*");
    if (res) {
        for (var i in res.data) {
            if (res.data[i].status) {
                var bha = 'btn btn-success';
            } else {
                var bha = 'btn btn-danger';

            }

            tr += `<tr>
         <td>${parseInt(i) + 1}</td>
         <td>${res.data[i].task}</td>
         
         <td><button class="btn btn-outline-primary" data-bs-toggle="modal"
         onclick='editStudent(${res.data[i].id})' data-bs-target="#editModel">Edit</button></td>
         <td><button onclick='status(${res.data[i].id},${res.data[i].status})' class="${bha}">${res.data[i].status}</button></td>
         <td><button onclick='deleteStudent(${res.data[i].id})' class="btn btn-outline-danger">Delete</button></td>
         </tr>`;

        }
        tbody.innerHTML = tr;
        loading.innerText = ""

    }

}

getStudent();

const getTotalCount = async () => {
    let total = document.querySelector("#total");
    const res = await database.from("todo").select("*", { count: "exact" }).eq("status",false);
    total.innerText = res.data.length;
}

getTotalCount();

const editStudent = async (id) => {


    const res = await database.from("todo").select("*").eq("id", id);
    if (res) {
        document.getElementById("id").value = res.data[0].id;
        document.getElementById("edit-name").value = res.data[0].task;
        // document.getElementById("edit-age").value = res.data[0].age;
        // document.getElementById("edit-country").value = res.data[0].country;
    }
}

const update = document.getElementById("update");

update.addEventListener("click", async () => {
    let id = document.getElementById("id").value;
    let task = document.getElementById("edit-name").value
    // let age = document.getElementById("edit-age").value;
    // let country = document.getElementById("edit-country").value;
    update.innerText = "Updateing...."
    update.setAttribute("disabled", true);
    const res = await database.from("todo").update({
        task,
        // age, country
    }).eq("id", id)

    if (res) {
        // alert("Student Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
        task = "";
        // age = "";
        // country = "";
        getStudent();
        getTotalCount();

    } else {
        alert("Student Not Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
    }
})


const deleteStudent = async (id) => {
    const res = await database.from("todo").delete().eq("id", id)

    if (res) {
        // alert("Delete successfully")
        getStudent();
        getTotalCount();

    } else {
        // alert("Delete successfully")
    }
}
const status = async (id, bha) => {
    var isB;

    bha ? isB = false:  isB = true;
    // if (bha) {
    //     var isB = false;

    // } else {
    //     var isB = true;
    // }


    const res = await database.from("todo").update({ 'status': isB }).eq('id', id)

    if (res) {
        // alert("Delete successfully")
        getStudent();
        getTotalCount();

    } else {
        // alert("Delete successfully")
    }
}
