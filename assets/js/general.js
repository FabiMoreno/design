"use strict";
// Global Variables

// Functioning Functions
  //This function adds event listeners
function addEars(els, et, f) {
  Array.prototype.forEach.call(els, function(e) {
    e.addEventListener(et, f, false)
    }
  )
}

function makeActive(els, activeClass, index) {
  Array.prototype.forEach.call(els, function(el) {
    if (el.classList) {
      el.classList.remove(activeClass);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  });
  if (els[index].classList) {
    els[index].classList.add(activeClass);
  } else {
    els[index].className += ' ' + activeClass;
  }
}

//  Create switchable code tabs
function snippetTabs(containers) {
  Array.prototype.forEach.call(containers, function(container) {
    var codeSnippets = container.querySelectorAll('table.codehilite');

    var numOfTabs = codeSnippets.length;
    var i = 0;

    //  create toggle navigation
    var toggleNav = container.querySelector('ul');
    var toggleNavItem = toggleNav.querySelectorAll('li');
    toggleNav.classList.add('nav--snippet-toggle');

    //  Function to call to toggle classes
    function toggleSnippet(a, index) {
      makeActive(toggleNavItem, 'current', index);
      makeActive(codeSnippets, 'active', index);
    }

    do {
      //  get the link on the page and use it to make a nav item
      if (i === 0) {
        toggleNavItem[i].classList.add('current');
        codeSnippets[i].classList.add('active');
      } else {
      // codeSnippets[i].classList.add('inactive');
      }
    //  attach a listener event to run the toggle function of the code snippet
      toggleNavItem[i].querySelector('a').addEventListener('click', function(event) {
        event.preventDefault(this);
        toggleSnippet(this, this.getAttribute('href'));
      }, false);
      i++;
    }
    while (i < numOfTabs);
  });
}
// Make text in input field highlight
function selectALlCodes() {
  var codeSelects = document.querySelectorAll('.click_to_select_all');
  Array.prototype.forEach.call(codeSelects, function(codeSelect) {
    codeSelect.addEventListener('click',function(){this.select()})
  })
}
// make codehilite areas one click highlight
function selectText( containerid ) {
  var node =  containerid ;
  if ( document.selection ) {
    var range = document.body.createTextRange();
    range.moveToElementText( node  );
    range.select();
  } else if ( window.getSelection ) {
    var rangeW = document.createRange();
    rangeW.selectNodeContents( node );
    window.getSelection().removeAllRanges();
    window.getSelection().addRange( rangeW );
  }
}
//fine all code hilite sections
function findCodeHiite() {
  var codeSelectDivs = document.querySelectorAll('div.click_to_select_div');
  Array.prototype.forEach.call(codeSelectDivs, function(codeSelectDiv) {
    codeSelectDiv.addEventListener('click', function() {selectText(codeSelectDiv)})
  })
}

function findDropdowns() {
  var dropObjects = document.querySelectorAll('.dropdown');
  Array.prototype.forEach.call(dropObjects, function(dropObject) {
    dropObject.addEventListener('click', function(e) {
      // if there's an href or something on the toggle don't follow it
      e.preventDefault(this);
      // contain the click so the body doesn't react to it and close the dropdown
      e.stopPropagation();
      toggleDropdown(this)

    }
    , false);
    })
}

//Dropdown code brought over from Application// clicking a dropdown's toggle should, yep, toggle it
function toggleDropdown(e) {

  //  closeAllDropdowns(e);
   var thisDropDown = e.querySelector('.dropdown-content');
     thisDropDown.style.display = (thisDropDown.style.display != 'block' ? 'block' : '' );
       // clicks inside a dropdown's content should not escape
     thisDropDown.addEventListener('click', function(e) {
       e.stopPropagation(this);
     });

       // clicking on links inside dropdown will cause dropdown to close
       var dropDownMenuItems = e.querySelectorAll('.dropdown-content > a');
       Array.prototype.forEach.call(dropDownMenuItems, function(dropDownItem) {
         dropDownItem.addEventListener('click', function(e) {
             this.parentElement.style.display = '';
         })
       })
      document.addEventListener('click', function() {
        closeAllDropdowns();
      })
}
function closeAllDropdowns(e) {
  var allDropdowns = document
      // close all dropdowns
      .querySelectorAll('.dropdown');

      Array.prototype.forEach.call(allDropdowns, function(dropdown) {
            dropdown.querySelector('.dropdown-content').style.display = 'none';
          })
}
function fakeTypeAhead() {
  var focused = document.activeElement;
  if(this === focused) {
    this.addEventListener('keydown', function() {
      this.nextElementSibling.style.display = "block"
    }, false)
  }
}
function closeTypeAhead() {
    this.nextElementSibling.style.display = "none"
}

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

function jumpToActive() {
  var anchors = document.querySelectorAll('.c--snippet-title')
  var nav = document.querySelector('.base-sidebar .navigation .subnav.active')

  window.addEventListener('scroll', function() {
    var currentPos = (scrollY + 300)

    Array.prototype.forEach.call(anchors, function(anchor) {
      if(currentPos >= anchor.offsetTop) {
        // nav.querySelector('a').classList.remove('active')
        var navItems = nav.querySelectorAll('a.active:not([data-goto="'+anchor.getAttribute('id')+'"])')
          Array.prototype.forEach.call(navItems, function(navItem) {
            navItem.classList.remove('active')
          })
        nav.querySelector('a[data-goto="'+anchor.getAttribute('id')+'"]').classList.add('active')
      }
    })
  })
}

// Search the DPL
  //create an object to push these items to in order to create actionable addresses outside of the typeahead
var dplPages = []
  //create, retrieve and format json feed for searching through
var dplSearch = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name', 'description'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  limit: 60,
  prefetch: {
    url: ['json/search.json'],
    transform: function(response) {
      //all of this is to reformat the json feed to allow searching of child sections inside of a parent page
      jQuery.each(response, function(i, page) {
        if(page.sections) {
          jQuery.each(page.sections, function(i, section) {
            section['parent']= page.id
            response.push(section)
          })
        }
      })
      return response
    }
  },
});

// passing in `null` for the `options` arguments will result in the default options being used
var tParent = {
  name: 'page',
  display: function(item) {
    return item.name
  },
  highlight: true,
  hint: false,
  minLength: 2,
  source: dplSearch.ttAdapter(),
  templates: {
    empty: function(page) {
      return '<div class="empty-message"> Your search for <strong>'
        + page.query +
      '</strong> has returned 0 results.</div>'
    },
    suggestion: function(page) {
      // change the url if the page is a child section of a parent url
      var searchAddress = new Object();
      searchAddress['name'] = page.name
      var searchResult = '<a class="dpl-s-result" href="'
      if(page.parent) {
        searchResult += page.parent
        searchAddress['base'] = page.parent
      } else {
        searchResult += page.id
        searchAddress['base'] = page.id
      }
      searchResult += '.html'
      if(page.parent) {
        searchResult += '#' + page.id
        searchAddress['child'] = page.id
      }
      searchResult += '">' + page.name + '<br /> <i>' + page.description + '</i></a>'
      dplPages.push(searchAddress)
      return searchResult
    }
  }
}
// I'm not sure how hacky this is but it's a work around to make the search results keyboard accessable
function goToPage(searchItem) {
  var selected = searchItem.currentTarget.value
  // loop through array of objects for matching name
  var selectedAddress = dplPages.filter(function(s) {
    return s.name == selected
  })
  var searchAddress = selectedAddress[0].base + '.html'
  if(selectedAddress[0].child) {
    searchAddress += '#' + selectedAddress[0].child
  }
  console.log('window location should redirect to ' + searchAddress)
  window.location.replace(searchAddress)
}

jQuery('#dpl-search').typeahead(null, tParent)
  .on('typeahead:selected', goToPage)
  .on('typeahead:autocompleted', goToPage);

// Put things here that you want to executed when the document is ready
var fa = function() {
  // Gobal vars
  var codeContainers = document.querySelectorAll('.c-example-code');
  var wonkaBar = document.querySelectorAll('.l-component-cluster .wonka-bar input');

  if (codeContainers.length >= 1) {
    snippetTabs(codeContainers);
    findCodeHiite(codeContainers);
  }
  addEars(wonkaBar, 'focus', fakeTypeAhead)
  addEars(wonkaBar, 'blur', closeTypeAhead)
  selectALlCodes()
  findDropdowns()
  jumpToActive()
};

// You know wait for page to be ready to do stuff

function ready(fa) {
  if (document.readyState !== 'loading') {
    console.log('document no ready');
    fa();
  } else {
    document.addEventListener('DOMContentLoaded', fa);
    console.log('woot! all ready to go');
  }
}

ready(fa);
