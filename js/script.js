// index start
$(document).ready(function(){

  $('#hide').click(function(){
    $('.imgh').hide(1000);
  });
  $('#show').click(function(){
    $('.imgh').show(1000);
  });
  $('#toggle').click(function(){
    $('.imgh').toggle(2000);
  });
  $('#fide1').click(function(){
    $('.imgf').fideOut();
  });

});
// index end

// draggable start
$( function() {
    $( "#drag" ).draggable();
  } );

//   e
$( function() {
    var $start_counter = $( "#event-start" ),
      $drag_counter = $( "#event-drag" ),
      $stop_counter = $( "#event-stop" ),
      counts = [ 0, 0, 0 ];
 
    $( "#drag2" ).draggable({
      start: function() {
        counts[ 0 ]++;
        updateCounterStatus( $start_counter, counts[ 0 ] );
      },
      drag: function() {
        counts[ 1 ]++;
        updateCounterStatus( $drag_counter, counts[ 1 ] );
      },
      stop: function() {
        counts[ 2 ]++;
        updateCounterStatus( $stop_counter, counts[ 2 ] );
      }
    });
 
    function updateCounterStatus( $event_counter, new_count ) {
      // first update the status visually...
      if ( !$event_counter.hasClass( "ui-state-hover" ) ) {
        $event_counter.addClass( "ui-state-hover" )
          .siblings().removeClass( "ui-state-hover" );
      }
      // ...then update the numbers
      $( "span.count", $event_counter ).text( new_count );
    }
  } );
//   2nd start
$( function() {
    $( "#sortable" ).sortable({
      revert: true
    });
    $( "#drag3" ).draggable({
      connectToSortable: "#sortable",
      helper: "clone",
      revert: "invalid"
    });
    $( "ul, li" ).disableSelection();
  } );
//   e
$( function() {
    $( "#drag4" ).draggable({ revert: true });
    $( "#drag5" ).draggable({ revert: true, helper: "clone" });
  } );
// draggable end
// Droppable start
$( function() {
    $( "#dragg" ).draggable();
    $( "#drop" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  } );
//   2nd
$( function() {
 
    // There's the gallery and the trash
    var $gallery = $( "#gallery" ),
      $trash = $( "#trash" );
 
    // Let the gallery items be draggable
    $( "li", $gallery ).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
 
    // Let the trash be droppable, accepting the gallery items
    $trash.droppable({
      accept: "#gallery > li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        deleteImage( ui.draggable );
      }
    });
 
    // Let the gallery be droppable as well, accepting items from the trash
    $gallery.droppable({
      accept: "#trash li",
      classes: {
        "ui-droppable-active": "custom-state-active"
      },
      drop: function( event, ui ) {
        recycleImage( ui.draggable );
      }
    });
 
    // Image deletion function
    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
    function deleteImage( $item ) {
      $item.fadeOut(function() {
        var $list = $( "ul", $trash ).length ?
          $( "ul", $trash ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );
 
        $item.find( "a.ui-icon-trash" ).remove();
        $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "48px" })
            .find( "img" )
              .animate({ height: "36px" });
        });
      });
    }
 
    // Image recycle function
    var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
    function recycleImage( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "96px")
          .append( trash_icon )
          .find( "img" )
            .css( "height", "72px" )
          .end()
          .appendTo( $gallery )
          .fadeIn();
      });
    }
 
    // Image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage( $link ) {
      var src = $link.attr( "href" ),
        title = $link.siblings( "img" ).attr( "alt" ),
        $modal = $( "img[src$='" + src + "']" );
 
      if ( $modal.length ) {
        $modal.dialog( "open" );
      } else {
        var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
          .attr( "src", src ).appendTo( "body" );
        setTimeout(function() {
          img.dialog({
            title: title,
            width: 400,
            modal: true
          });
        }, 1 );
      }
    }
 
    // Resolve the icons behavior with event delegation
    $( "ul.gallery > li" ).on( "click", function( event ) {
      var $item = $( this ),
        $target = $( event.target );
 
      if ( $target.is( "a.ui-icon-trash" ) ) {
        deleteImage( $item );
      } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
        viewLargerImage( $target );
      } else if ( $target.is( "a.ui-icon-refresh" ) ) {
        recycleImage( $item );
      }
 
      return false;
    });
  } );
// Droppable end
// Resizable start
$( function() {
    $( "#resizable" ).resizable({
      animate: true
    });
  } );
//   e
$( function() {
    $( "#resiz" ).resizable({
      alsoResize: "#also"
    });
    $( "#also" ).resizable();
  } );
// Resizable end
// Selectable start
$( function() {
    $( "#selectable" ).selectable();
  } );
// e
$( function() {
    $( "#select" ).selectable();
  } );
// Selectable end
// Sortable start
$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  } );
//   e
$( function() {
    $( "#sortable1" ).sortable({
      items: "li:not(.ui-state-disabled)"
    });
 
    $( "#sortable2" ).sortable({
      cancel: ".ui-state-disabled"
    });
 
    $( "#sortable1 li, #sortable2 li" ).disableSelection();
  } );
// Sortable end
// one end
// two start
// accordion start
$( function() {
  $( "#accordion" ).accordion();
} );
// e
$( function() {
  $( "#accordion2" ).accordion({
    heightStyle: "fill"
  });

  $( "#accordion-resizer" ).resizable({
    minHeight: 140,
    minWidth: 200,
    resize: function() {
      $( "#accordion2" ).accordion( "refresh" );
    }
  });
} );
// accordion end
// Autocomplete start
$( function() {
  var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];
  $( "#tags" ).autocomplete({
    source: availableTags
  });
} );
// e
$( function() {
  var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];
  function split( val ) {
    return val.split( /,\s*/ );
  }
  function extractLast( term ) {
    return split( term ).pop();
  }

  $( "#tags2" )
    // don't navigate away from the field on tab when selecting an item
    .on( "keydown", function( event ) {
      if ( event.keyCode === $.ui.keyCode.TAB &&
          $( this ).autocomplete( "instance" ).menu.active ) {
        event.preventDefault();
      }
    })
    .autocomplete({
      minLength: 0,
      source: function( request, response ) {
        // delegate back to autocomplete, but extract the last term
        response( $.ui.autocomplete.filter(
          availableTags, extractLast( request.term ) ) );
      },
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        return false;
      }
    });
} );
// Autocomplete end
// Checkboxradio start
$( function() {
  $( "input" ).checkboxradio();
} );
// e
$( function() {
  function handleShape( e ) {
    $( ".shape" )
      .removeClass( "circle pill square rectangle" )
      .addClass( $( e.target ).val() );
  };
  function handleToggle( e ) {
    var target = $( e.target );

    if ( target.is( ".brand-toggle" ) ) {
      var checked = target.is( ":checked" ),
        value = $( "[name='brand']" )
          .filter( ":checked" )
          .attr( "data-" + target[ 0 ].id )
      $( ".shape" ).css( target[ 0 ].id, checked ? value : "" );
    } else {
      $( ".shape" ).toggleClass( target[ 0 ].id, target.is( ":checked") );
    }
  }
  function updateBrand() {
    handleShape( { target: $( "[name='shape']:checked" ) } );
    $( ".toggle:checked" ).each( function() {
      handleToggle( { target: $( this ) } );
    } );
  }

  // Initalize widgets
  $( "input" ).checkboxradio();
  $( ".shape-bar, .brand" ).controlgroup();
  $( ".toggles" ).controlgroup( {
    direction: "vertical"
  } );

  // Bind event handlers
  $( "[name='shape']").on( "change", handleShape );
  $( ".toggle" ).on( "change", handleToggle );
  $( "[name='brand']").on( "change", updateBrand );

  // Set initial values
  updateBrand();
} );
// Checkboxradio end
// Controlgroup start
$( function() {
  $( "select" ).selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-button-icon-only demo-splitbutton-select"
    },
    change: function(){
      $( ".output" ).append( "<li>" + this.value + "</li>" );
    }
  });
  $( ".controlgroup" ).controlgroup();
  $( "button" ).click(function() {
    $( ".output" ).append( "<li>Running Last Action...</li>" );
  });
} );
// e
$( function() {
  var page = $( "#page" );
  var basicControls = [ "#print", "#bold", "#italic", "#undo", "#redo" ];
  var valueControls = [ "#fontsize", "#forecolor", "#hilitecolor", "#backcolor", "fontname" ];

  $( "#print" ).button({
    "icon": "ui-icon-print",
    "showLabel": false
  });
  $( "#redo" ).button({
    "icon": "ui-icon-arrowreturnthick-1-e",
    "showLabel": false
  });
  $( "#undo" ).button({
    "icon": "ui-icon-arrowreturnthick-1-w",
    "showLabel": false
  });

  $( ".toolbar" ).controlgroup();
  $( "#zoom" ).on( "selectmenuchange", function() {
    page.css({ "zoom": $( this ).val() });
  })
  $( basicControls.concat( valueControls ).join( ", " ) ).on( "click change selectmenuchange",
    function() {
      document.execCommand(
        this.id,
        false,
        $( this ).val()
      );
    } );
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
  });
} );
// Controlgroup end
// Datepicker start
$( function() {
  $( "#datepicker" ).datepicker();
} );
// e
$( function() {
  $( "#datepicker2" ).datepicker({
    altField: "#alternate",
    altFormat: "DD, d MM, yy"
  });
} );
// Datepicker end
// two end

// three start
// Dialog start
$( function() {
  $( "#dialog" ).dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    }
  });

  $( "#opener" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
  });
} );
// e
$( function() {
  var dialog, form,

    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    name = $( "#name" ),
    email = $( "#email" ),
    password = $( "#password" ),
    allFields = $( [] ).add( name ).add( email ).add( password ),
    tips = $( ".validateTips" );

  function updateTips( t ) {
    tips
      .text( t )
      .addClass( "ui-state-highlight" );
    setTimeout(function() {
      tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
  }

  function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
      o.addClass( "ui-state-error" );
      updateTips( "Length of " + n + " must be between " +
        min + " and " + max + "." );
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
      o.addClass( "ui-state-error" );
      updateTips( n );
      return false;
    } else {
      return true;
    }
  }

  function addUser() {
    var valid = true;
    allFields.removeClass( "ui-state-error" );

    valid = valid && checkLength( name, "username", 3, 16 );
    valid = valid && checkLength( email, "email", 6, 80 );
    valid = valid && checkLength( password, "password", 5, 16 );

    valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
    valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
    valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

    if ( valid ) {
      $( "#users tbody" ).append( "<tr>" +
        "<td>" + name.val() + "</td>" +
        "<td>" + email.val() + "</td>" +
        "<td>" + password.val() + "</td>" +
      "</tr>" );
      dialog.dialog( "close" );
    }
    return valid;
  }

  dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Create an account": addUser,
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
      form[ 0 ].reset();
      allFields.removeClass( "ui-state-error" );
    }
  });

  form = dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    addUser();
  });

  $( "#create-user" ).button().on( "click", function() {
    dialog.dialog( "open" );
  });
} );
// Dialog end
// menu start
$( function() {
  $( "#menu" ).menu();
} );
// e
$( function() {
  $( "#menu2" ).menu();
} );
// menu end
/* menu start */
// Progressbar start
$( function() {
  var progressbar = $( "#progressbar" ),
    progressLabel = $( ".progress-label" );

  progressbar.progressbar({
    value: false,
    change: function() {
      progressLabel.text( progressbar.progressbar( "value" ) + "%" );
    },
    complete: function() {
      progressLabel.text( "Complete!" );
    }
  });

  function progress() {
    var val = progressbar.progressbar( "value" ) || 0;

    progressbar.progressbar( "value", val + 2 );

    if ( val < 99 ) {
      setTimeout( progress, 80 );
    }
  }

  setTimeout( progress, 2000 );
} );
// e
$( function() {
  var progressTimer,
    progressbar = $( "#progressbar2" ),
    progressLabel = $( ".progress-label" ),
    dialogButtons = [{
      text: "Cancel Download",
      click: closeDownload
    }],
    dialog = $( "#dialog" ).dialog({
      autoOpen: false,
      closeOnEscape: false,
      resizable: false,
      buttons: dialogButtons,
      open: function() {
        progressTimer = setTimeout( progress, 2000 );
      },
      beforeClose: function() {
        downloadButton.button( "option", {
          disabled: false,
          label: "Start Download"
        });
      }
    }),
    downloadButton = $( "#downloadButton" )
      .button()
      .on( "click", function() {
        $( this ).button( "option", {
          disabled: true,
          label: "Downloading..."
        });
        dialog.dialog( "open" );
      });

  progressbar.progressbar({
    value: false,
    change: function() {
      progressLabel.text( "Current Progress: " + progressbar.progressbar( "value" ) + "%" );
    },
    complete: function() {
      progressLabel.text( "Complete!" );
      dialog.dialog( "option", "buttons", [{
        text: "Close",
        click: closeDownload
      }]);
      $(".ui-dialog button").last().trigger( "focus" );
    }
  });

  function progress() {
    var val = progressbar.progressbar( "value" ) || 0;

    progressbar.progressbar( "value", val + Math.floor( Math.random() * 3 ) );

    if ( val <= 99 ) {
      progressTimer = setTimeout( progress, 50 );
    }
  }

  function closeDownload() {
    clearTimeout( progressTimer );
    dialog
      .dialog( "option", "buttons", dialogButtons )
      .dialog( "close" );
    progressbar.progressbar( "value", false );
    progressLabel
      .text( "Starting download..." );
    downloadButton.trigger( "focus" );
  }
} );
// Progressbar end
// Selectmenu start
$( function() {
  var circle = $( "#circle" );

  $( "#radius" ).selectmenu({
    change: function( event, data ) {
      circle.css({
        width: data.item.value,
        height: data.item.value
      });
    }
   });

  $( "#color" ).selectmenu({
     change: function( event, data ) {
       circle.css( "background", data.item.value );
     }
   });
} );
// e
$( function() {
  $( "#speed" ).selectmenu();

  $( "#files" ).selectmenu();

  $( "#number" )
    .selectmenu()
    .selectmenu( "menuWidget" )
      .addClass( "overflow" );

  $( "#salutation" ).selectmenu();
} );
// Selectmenu end
// three end
// four start
// slider start
$( function() {
  function hexFromRGB(r, g, b) {
    var hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 )
    ];
    $.each( hex, function( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
    });
    return hex.join( "" ).toUpperCase();
  }
  function refreshSwatch() {
    var red = $( "#red" ).slider( "value" ),
      green = $( "#green" ).slider( "value" ),
      blue = $( "#blue" ).slider( "value" ),
      hex = hexFromRGB( red, green, blue );
    $( "#swatch" ).css( "background-color", "#" + hex );
  }

  $( "#red, #green, #blue" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    slide: refreshSwatch,
    change: refreshSwatch
  });
  $( "#red" ).slider( "value", 255 );
  $( "#green" ).slider( "value", 140 );
  $( "#blue" ).slider( "value", 60 );
} );
// e
$( function() {
  // setup master volume
  $( "#master" ).slider({
    value: 60,
    orientation: "horizontal",
    range: "min",
    animate: true
  });
  // setup graphic EQ
  $( "#eq > span" ).each(function() {
    // read initial values from markup and remove that
    var value = parseInt( $( this ).text(), 10 );
    $( this ).empty().slider({
      value: value,
      range: "min",
      animate: true,
      orientation: "vertical"
    });
  });
} );
// slider end
// Spinner start
$( function() {
  var spinner = $( "#spinner" ).spinner();

  $( "#disable" ).on( "click", function() {
    if ( spinner.spinner( "option", "disabled" ) ) {
      spinner.spinner( "enable" );
    } else {
      spinner.spinner( "disable" );
    }
  });
  $( "#destroy" ).on( "click", function() {
    if ( spinner.spinner( "instance" ) ) {
      spinner.spinner( "destroy" );
    } else {
      spinner.spinner();
    }
  });
  $( "#getvalue" ).on( "click", function() {
    alert( spinner.spinner( "value" ) );
  });
  $( "#setvalue" ).on( "click", function() {
    spinner.spinner( "value", 5 );
  });

  $( "button" ).button();
} );
// e
$( function() {
  $( "#currency" ).on( "change", function() {
    $( "#spinner" ).spinner( "option", "culture", $( this ).val() );
  });

  $( "#spinner" ).spinner({
    min: 5,
    max: 2500,
    step: 25,
    start: 1000,
    numberFormat: "C"
  });
} );
// Spinner end
// tabs start
$( function() {
  $( "#tabs" ).tabs({
    event: "mouseover"
  });
} );
// e
$( function() {
  $( "#tabs2" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs2 li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
} );
// tabs end
// Tooltip start
$( function() {
  $( "#show-option" ).tooltip({
    show: {
      effect: "slideDown",
      delay: 250
    }
  });
  $( "#hide-option" ).tooltip({
    hide: {
      effect: "explode",
      delay: 250
    }
  });
  $( "#open-event" ).tooltip({
    show: null,
    position: {
      my: "left top",
      at: "left bottom"
    },
    open: function( event, ui ) {
      ui.tooltip.animate({ top: ui.tooltip.position().top + 10 }, "fast" );
    }
  });
} );
// e
$( function() {
  var tooltips = $( "[title]" ).tooltip({
    position: {
      my: "left top",
      at: "right+5 top-5",
      collision: "none"
    }
  });
  $( "<button>" )
    .text( "Show help" )
    .button()
    .on( "click", function() {
      tooltips.tooltip( "open" );
    })
    .insertAfter( "form" );
} );
// e
$( function() {
  function notify( input ) {
    var msg = "Selected " + $.trim( input.data( "tooltip-title" ) || input.text() );
    $( "<div>" )
      .appendTo( document.body )
      .text( msg )
      .addClass( "notification ui-state-default ui-corner-bottom" )
      .position({
        my: "center top",
        at: "center top",
        of: window
      })
      .show({
        effect: "blind"
      })
      .delay( 1000 )
      .hide({
        effect: "blind",
        duration: "slow"
      }, function() {
        $( this ).remove();
      });
  }

  $( "button" ).each(function() {
    var button = $( this ).button({
      icons: {
        primary: $( this ).data( "icon" )
      },
      text: !!$( this ).attr( "title" )
    });
    button.not( ".menu" ).on( "click", function() {
      notify( button );
    });
  });
  $( ".set" ).controlgroup({
    items: {
      "button" : "button"
    }
  });

  $( "button.menu" )
    .on( "click", function() {
      $( document ).tooltip( "close", { currentTarget: this });
      var menu = $( this ).next().show().position({
        my: "left top",
        at: "left bottom",
        of: this
      });
      $( document ).one( "click", function() {
        menu.hide();
      });
      return false;
    })
    .next()
      .hide()
      .menu({
        selected: function( event, ui ) {
          notify( ui.item );
        }
      });

  $( document ).tooltip({
    position: {
      my: "center top",
      at: "center bottom+5",
    },
    show: {
      duration: "fast"
    },
    hide: {
      effect: "hide"
    }
  });
} );
// Tooltip end
// four end