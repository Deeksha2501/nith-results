let branch, batch, c;
let con = document.querySelector("#table");

$("#search").keyup(get);

function check() {
  branch = document.querySelector("#branch").value;
  batch = document.querySelector("#batch").value;
  c = document.querySelector("#cg-sg").value;
  console.log(c);
  let branchop = document.querySelector("#branch");
  var batchop = document.querySelector("#batch");
  var cs = document.querySelector("#cg-sg");
  branchop.addEventListener("click", get());
  batchop.addEventListener("click", get());
  cs.addEventListener("click", get());
  var img = branch.split("_");
  document.querySelector(
    "body"
  ).style.backgroundImage = `linear-gradient(to bottom , rgba(0, 0, 0, 0.881) , rgba(0, 0, 0, 0.885)) ,url('./images/${img[0]}.jpg')`;
}

function clear() {
  let divs = document.querySelectorAll("#table > div");

  for (var div of divs) {
    div.parentElement.removeChild(div);
  }
}

function get() {
  $("#state").val("");
  var searchField = $("#search").val();
  var expression = new RegExp(searchField, "i");
  $.getJSON(`./json/${branch}/batch_${batch}_${c}pi.json`, function (data) {
    let count = 0 , flag = 0;
    // $('.table-row').empty();
    // if(data.length === 0){
    //   document.querySelector('.nothing').style.display = inline;
    // }
    // document.querySelector('.total').innerHTML = `Total Results : ${data.length}`;
    clear();
    $.each(data, function (key, value) {
      if (
        value.Name.search(expression) != -1 ||
        value.Rollno.search(expression) != -1 ||
        value.Branch.search(expression) != -1
      ) {
        flag = 1;
        count += 1;
        document.querySelector('.nothing').style.display = "none";
        document.querySelector('.total').innerHTML = `Total Results : ${count}`;
        // console.log(value);
        let branch = value.Branch.split('_')[0];
        if(branch == 'Cse'){
          branch = 'Computer Science and Enginnering'
        }else if(branch == 'Ece'){
          branch = 'Electronics and Communication Engineering'
        }else if(branch == 'Architecture'){
          //nothing
        }
        else if(branch == 'Material'){
          branch += ' Science and Engineering'
        }
        else{
          branch += ' Engineering'
        }
        let color = "";
        if (value.Rank == 1) {
          color = "#ffd701";
        } else if (value.Rank == 2) {
          color = "#c0c0c0";
        } else if (value.Rank == 3) {
          color = "#e3b778";
        } else {
          color = "#00acbd";
        }
        // console.log(color)
        $("#table").append(
          `
    <div class="table-row">
    <div class="table-cell name">
        <div class="head">${value.Rollno}</div>
        <div class="p">${value.Name}</div>
      </div>
    <div class="table-cell branch">
      <div class="head">Year : ${value.Year}</div>
      <div class="p">${branch}</div>
    </div>
    <div class="table-cell cg">
      <div class="head">CGPA : ${value.Cgpa}</div>
      <div class="p">SGPA : ${value.Sgpa}</div>
    </div>
    <div class="table-cell rank">
    <div style="background-color: ${color}" class="r head">
      ${value.Rank}
    </div>
    <div class="p prank">invisible</div>
    </div>
  </div>
        `
        );
      }
    });
    if(flag == 0){
      count = 0;
      document.querySelector('.total').innerHTML = `Total Results : ${count}`;
      document.querySelector('.nothing').style.display = "block";

    }
  });
}

check();