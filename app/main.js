var  total;

function get_date(){
  var d = new Date(),
      res = "",
      month,
      day;
  res += d.getFullYear()
  month = d.getMonth() + 1;
  day = d.getDate();
  res += month < 10 ? "0" + month : month;  
  res += day < 10 ? "0" + day : day;
  return res;
}

function get_number(){
  var d = new Date();
  return d.getTime();
}

function collect(){
  var input = $("input"),
    textarea = $("textarea"),
    data = {},
    i,
    key;

  for(i=0; i<input.length; i++){
    key = $(input[i]).parent().prev("td").html();
    data[key] = $(input[i]).val();
  }
  for(i=0; i<textarea.length; i++){
    key = $(textarea[i]).parent().prev("td").html();
    data[key] = $(textarea[i]).val();
  }
  data["日期"] = get_date();
  data["工单号"] = get_number();
  return data;
}

function clean(){
  var inputs = $("input"),
      tas = $("textarea").html(""),
      i;

  for(i=0; i<inputs.length; i++){
    $(inputs[i]).val("");
  }
  for(i=0; i<tas.length; i++){
    $(tas[i]).val("");
  }
}

function sum_display(){
  $(".worksheet").hide();
  $(".sum").show();
  $(".total tr").remove();

  var dom = $(".total"),
      html = "",
      key,
      i;
  html += "<tr>";
  if(total.length == 0) {
    alert("No history records!");
    return;
  }

  for(key in total[0]) if(total[0].hasOwnProperty(key)){
    html += "<th>" + key + "</th>";
  }
  html += "</tr>";
  for(i=0; i<total.length; i++) if( total[i].hasOwnProperty(key) ){
    html += "<tr>";
    for(key in total[i]) {
      html += "<td>" + total[i][key] + "</td>";
    }
    html += "</tr>";
  }
  dom.append(html);
}

function save(){
  var data = collect();
  $.ajax({
    url: "/",
    type: "POST",
    data: data,
    success: function(res){
      total = JSON.parse(res)["data"];
      alert("保存成功");
      clean();
      sum_display();
    }
  });
}

$(function(){
  $($("input")[0]).val(get_number());
  $($("input")[2]).val(get_date());
  $.ajax({
    url: "/sheets",
    type: "GET",
    cache: true,
    success: function(res){
      total = JSON.parse(res)["data"];
    }
  });
  $(".sum").hide();

  $(".save").bind("click", save);
  $(".display").bind("click", sum_display);
  $(".back").bind("click", function(){
    $(".sum").hide();
    $(".worksheet").show();
    $(".save, .display").show();
    $($("input")[0]).val(get_number());
    $($("input")[2]).val(get_date());
  })
})