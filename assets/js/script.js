
const submitButton      = $("#form-save");
const dismissButton     = $("#form-dismiss");

const pName             = $("#project-name");
const pType             = $("#project-type");
const pWage             = $("#project-wage");
const pDue              = $("#datepicker");

const tNow              = $("#time-now");
const dNow              = $("#date-now");


// const
// const
// const
// const

class formDataItem {
    constructor(n, t, w, d) {
        this.name = n;
        this.type = t;
        this.wage = w;
        this.date = d;
    }
} 

var formData = []

try {formData = JSON.parse(localStorage.getItem("formData"))} catch(e){console.log(e);}



dismissButton.on("click", function(e) {
    clearForm();
});

submitButton.on("click", function(e) {

    getFormData();
    renderTable();
    clearForm();
});

$(".table").on("click", function(e){
    if($(e.target).hasClass("deleteable")){
        let par = $(e.target).parent();

        for (let j = 0; j < formData.length; j++) {
            console.log(par.children().eq(1).text())
            console.log(formData[j].name)
            if(
                par.children().eq(1).text() === formData[j].name 
                // && par.children().eq(2).text() === formData[j].type 
                // && par.children().eq(3).text() === formData[j].wage
                ){
                console.log(formData);
                let deleted = formData.splice(j, 1);
                console.log(deleted)
                console.log(formData);
                localStorage.setItem("formData", JSON.stringify(formData));
            }
            
        }
            



        par.remove()

    }
})




$( function() {
    $( "#datepicker" ).datepicker();
  } );




function getFormData(){

    let n = pName.val();
    let t = pType.val();
    let w = pWage.val();
    let d = pDue.val();


    if(formData !== null){
        formData.push(new formDataItem(n, t, w, d));
    }
    else{
        formData = [new formDataItem(n, t, w, d)];
    }

    localStorage.setItem("formData", JSON.stringify(formData));
}

function renderTable(){
try{
    let tableBody = $(".table").children().eq(1);
    tableBody.html("");

    for (let i = 0; i < formData.length; i++) {
        let row = $("<tr>")
        let head = $("<th scope=\"row\">").text(i)
        row.append(head);
        let n = $("<td>").text(formData[i].name);
        let t = $("<td>").text(formData[i].type);
        let w = $("<td>").text(formData[i].wage);
        let d = $("<td>").text(formData[i].date);
        row.append(n, t, w, d);
        let timeUntil = moment(formData[i].date).diff(moment(), "days")
        let tU = $("<td>").text(timeUntil + " days");
        row.append(tU);

        let holdMyWage = parseInt(formData[i].wage, 10);
        console.log(holdMyWage)
        console.log(timeUntil)

        let payday = $("<td>").text(timeUntil * 8 * holdMyWage);
        row.append(payday);

        let x = $("<td>").text("x").addClass("deleteable")
        row.append(x);
        tableBody.append(row);
    }
}catch(e){console.log(e)}

}

function clearForm(){
    pName.val("");
    pType.val("Bug Hunt");
    pWage.val("");
    pDue.val("");
}

var counting = setInterval(function(){

    var timeNow =   moment().format("HH:mm:ss:SSS"); 
    var dateNow =   moment().format("MMMM Do, YYYY");

    tNow.text(timeNow);
    dNow.text(dateNow);


}, 3);


renderTable();