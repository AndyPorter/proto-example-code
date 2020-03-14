const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line


// Branching - checkboxes
router.post('/checkboxes/checkbox-branching-route', function (req, res) {
  // Get the value of the checkboxes from session data
  // The name between the quotes is the same as the 'name' attribute on the checkox elements
  // However in JavaScript we can't use hyphens in variable names

  // let peopleNamedJohn = req.session.data['people-named-john']
  // peopleNamedJohn is either 
  // - undefined or 
  // - a set of values (between 1 and numberofcheckboxex) containing the checkbox value or '_unchecked'

	  // *** Investigation ***
	  // first time into the page, if the user clicks submit without touching the checkboxes then we get 
	  // peopleNamedJohn = undefined
	  // or, if the user does that, then goes back via the browser button, then clicks submit again we get
	  // peopleNamedJohn = [ '_unchecked' ]
	  // if they go back and select one of the names we get a set that contains more of the set,
	  // e,g, if they select the 2md of three options we get
	  // peopleNamedJohn = [ '_unchecked', 'johnny-blue' ]

	  // if the user goes back (via the browser back button) and makes a different selection, you get the full set with a value set for each
	  // checked ones have the value, unchecked ones say undefiuned, eg
	  // [ 'jonathon-brown', 'johnny-blue', 'david-jonno-johnson' ]
	  // ['_unchecked', 'jonathon-brown', 'david-jonno-johnson' ]

	  // if you use my page nav - to have another go, and select no checkboxes
	  // peopleNamedJohn = undefined
	  // if you went back and selected just one, you get just that bvalue e,g, if you sleect the 3rd you get
	  // peopleNamedJohn = [ 'david-jonno-johnson' ]

  // so to route to the 'a person has been selected' page we need to ensure:
  // - the array isn't all '_unchecked'
  // - isn't undefined


  let peopleNamedJohnArray = req.session.data['people-named-john']

  var uncheckedCount = 0
  var unselectedCheckboxesExist = true

  // if undefined unselectedCheckboxesExist = true
  if (peopleNamedJohnArray === undefined) {
  		unselectedCheckboxesExist = true
	} else
	{
	 	// count the numebr of unchecked items 
		peopleNamedJohnArray.forEach((element) => {
		  if (element === '_unchecked') {
			uncheckedCount++
		  }
		})
		// if the unchecked count is the same as the length of the array then they are all unchecked
		if (uncheckedCount === peopleNamedJohnArray.length) {
			unselectedCheckboxesExist = true
		}
		else {
			unselectedCheckboxesExist = false
		}
	}


  if (unselectedCheckboxesExist) {
    res.redirect('checkboxes-not-selected')
  } else {
    res.redirect('checkboxes-were-selected')
  }

})


module.exports = router



