$(document).ready(function() {
  $('.tooltip').tooltipster({
    theme: 'tooltipster-shadow'
  });

  // ITEM
  var item = "";
  var itemGroup = ""
  var icon = ""
  var cellGround = "";
  var currentCell;
  $(".items li a").click(function() {
    $(".items li a").removeClass("active");
    $(this).addClass("active");
    $(".cell").removeClass("active");
    item = $(this).attr('data-item');
    itemGroup = $(this).parent().parent().attr('data-group');
    icon = $(this).find('img').attr('src');

    $("#grid").css('cursor', 'url(' + icon + ') 16 16, auto');
  });
  // CELL
  $(".cell").click(function() {
		currentCell = $(this);
    cellGround = $(this).attr('data-ground');

    if ( cellGround != 'plantable' && itemGroup == 'vegetation') {
      msg("Invalid Position", "Vegetation could only be planted on plantable dirt.");
    } else if ( cellGround != 'dirt' && itemGroup == 'animals') {
      msg("Invalid Position", "Animals can only be placed on land.");
    } else if ( cellGround != 'stone' && itemGroup == 'buildings') {
      msg("Invalid Position", "Buildings can only be placed on stone.");
    } else if (item != "" && itemGroup != "") {
      $.get("request.php", function(data) {
        if (data == "ok") {
          if (itemGroup == 'ground') {
						$(currentCell).removeClass(cellGround);
						$(currentCell).addClass(item);
						$(currentCell).attr('data-ground',item);
          } else {
						if($(currentCell).html() != ""){
							msg("Are you sure","You have something else in this cell, all progress of this cell will be lost, are you sure ?");
						}else {
							$(currentCell).html('<img src="img/bar/time.png"/>'+'<img src="img/'+itemGroup+'/'+item+'.png"/>');
						}
					}
        } else {
					msg("Something is wrong!", data);
        }
      });
    }
  });

  $("#clearSelection").click(function() {
    item = "";
    itemGroup = "";
    icon = "";
    $(".items li a").removeClass("active");
    $(".cell").removeClass("active");
    $("#grid").css('cursor', 'pointer');
  });
});


function msg(title, msg) {
  new Messi(msg, {
    title: title,
    buttons: [{
      id: 0,
      label: 'OK',
      val: 'X'
    }]
  });
}
