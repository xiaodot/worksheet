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

  return data;
}

function save(){

}

$(function(){
  $("#test").load("demo.txt");
})