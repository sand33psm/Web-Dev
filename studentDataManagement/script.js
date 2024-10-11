student_data_container = document.querySelector(".student-data");

const userForm = document.querySelector("#userForm");
const student_info_btn = document.querySelector("#student-info-btn");
const home_btn = document.querySelector(".home-button")

// Get student data from localStorage
function get_stu_data() {
    if (localStorage.getItem('student_data') == null) {
        student_data = [];
    } else {
        student_data = JSON.parse(localStorage.getItem('student_data'));
    }
    return student_data;
}

// Display student data
function display_stu_data(stu_data_object = null) {
    student_data = get_stu_data();
    
    if (stu_data_object != null) {
        student_data.push(stu_data_object);
        localStorage.setItem("student_data", JSON.stringify(student_data));
    }

    userForm?.reset();  // Only reset if the form exists (on index.html)

    html = '';

    student_data.forEach((element, index) => {
        html += `
            <div class="student-card" id=${index}>
                <h3> ${element.enrolment_no} </h3>
                <h3> ${element.name} </h3>
                <h3> ${element.email}</h3>
                <h3> ${element.contact}</h3>
                <div class="button-group">
                    <button class="edit-button" onclick="edit_student(${index})">Edit</button>
                    <button class="delete-button" onclick="delete_student(${index})">Delete</button>
                </div>
            </div>
        `;
    });
    

    student_data_container.innerHTML = html;
}

let currentEditIndex = null

function edit_student(index){
    console.log("clicked on student....");
    studentToEdit = JSON.parse(localStorage.getItem('student_data'))[index]

    edit_form = document.querySelector(".edit-student-form")
    edit_form.innerHTML = `
        <form id="userForm">
                <label for="enrolment_no">Enrolment No:</label>
                <input type="number" id="enrolment_no" name="enrolment_no" placeholder="Enter your enrolment no" required>
                <br><br>

                <label for="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required>
                <br><br>

                <label for="email">Email ID:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email ID" required>
                <br><br>

                <label for="mobile">Mobile Number:</label>
                <input type="tel" id="contact" name="contact" placeholder="Enter your mobile number" pattern="[0-9]{10}" required>
                <br><br>

                <button type="submit">Submit</button>
                <button onClick = "cancel_edit()"> Cancel </button>
            </form>
    `
    
    // Populate the form fields with the current student data
    document.querySelector('#enrolment_no').value = studentToEdit.enrolment_no;
    document.querySelector('#name').value = studentToEdit.name;
    document.querySelector('#email').value = studentToEdit.email;
    document.querySelector('#contact').value = studentToEdit.contact;

    edit_form?.addEventListener('submit', function (event) {
        event.preventDefault();
    
        stu_enrolment_no = document.querySelector('#enrolment_no').value;
        stu_name = document.querySelector('#name').value;
        stu_email = document.querySelector('#email').value;
        stu_contact = document.querySelector('#contact').value;
        
        
        stu_data_object = {
            enrolment_no: stu_enrolment_no,
            name: stu_name,
            email: stu_email,
            contact: stu_contact
        };

        stu_data = JSON.parse(localStorage.getItem('student_data'))

        stu_data[index] = { ...stu_data[index], ...stu_data_object };

        localStorage.setItem('student_data', JSON.stringify(stu_data));

        
        display_stu_data()
        cancel_edit()
    })
}

function cancel_edit(){
    edit_form = document.querySelector(".edit-student-form")
    edit_form.innerHTML = ""
}

function delete_student(index){
    console.log("clicked on delete");
    student_records = JSON.parse(localStorage.getItem('student_data'))
    student_records.splice(index, 1)
    localStorage.setItem("student_data", JSON.stringify(student_records))
    display_stu_data()

}

// Form submission handler (only for index.html)
userForm?.addEventListener('submit', function (event) {
    event.preventDefault();

    stu_enrolment_no = document.querySelector('#enrolment_no').value;
    stu_name = document.querySelector('#name').value;
    stu_email = document.querySelector('#email').value;
    stu_contact = document.querySelector('#contact').value;

    stu_data_object = {
        enrolment_no: stu_enrolment_no,
        name: stu_name,
        email: stu_email,
        contact: stu_contact
    };

    if (currentEditIndex !== null) {
        // If editing, update the existing student record
        const student_data = get_stu_data();
        student_data[currentEditIndex] = stu_data_object; // Update the object
        localStorage.setItem("student_data", JSON.stringify(student_data)); // Save back to local storage

        // Reset the currentEditIndex
        currentEditIndex = null;
    } else {
        // If not editing, add a new student
        display_stu_data(stu_data_object);
    }

    display_stu_data(stu_data_object);

});

// Display student info button click handler
student_info_btn?.addEventListener('click', function (event) {
    window.location.href = "all_students.html";
});

home_btn?.addEventListener("click", function(evernt){
    window.location.href = "index.html"
})

// Load student data when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    display_stu_data();
});

