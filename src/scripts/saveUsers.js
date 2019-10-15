// u - username - strings
// l - lastContacted - 01-02-2019
// r - replied - t or f or u

// SAVE USERS WHEN SCROLLING MESSAGES
document.addEventListener('DOMContentLoaded', function () {
  if (
    document.location.pathname.includes('message/messages') || 
    document.location.pathname.includes('message/inbox')
  ) {
    // document.addEventListener('scroll', function (event) {
      saveUsersWhenScrollingMessages(event);
    // });
  }
});

// SAVE USERS WHEN SENDING MESSAGE
document.addEventListener('keypress', function (event) {
  if (document.location.href.includes('message/compose')) {
    saveUserWhenSendingMessage(event);
  }
});
 
function saveUsersWhenScrollingMessages(event) {
  try {
    Array.from(document.querySelectorAll('.head')).forEach(function(element) {
      const textArray = element.textContent.split(' ');
      const username = textArray[1];

      console.log(username);

      if (textArray[0] === "to") { // NOTE: Will need to update the function in some way, shape or form.
        saveUserToDatabase(newUsername, { r: 'f' });
      } 
      
      if (textArray[0] === "from") {
        // NOTE: There you go. 
        saveUserToDatabase(newUsername, { r: 't' });
      }
    });
  } catch(e) {
    alert('saveUsersWhenScrollingMessages: ' + e);
  }
}

function saveUserWhenSendingMessage(event) {
  try {
    var key = event.which || event.keyCode;

    if (key === 13) {
      const inputElement = document.querySelector('[name="to"]');
      const newUsername = inputElement.value;

      saveUserToDatabase(newUsername, {});
    }
  } catch(e) {
    alert('saveUserWhenSendingMessage: ' + e);
  }
}

function saveUserToDatabase(newUsername, additionalFields) {
  chrome.storage.local.get('usersList', function (data) {
    if (data.usersList && data.usersList.length > 0) {
      const foundUser = data.usersList.find(user => user.username === newUsername);

      if (foundUser) {
        // TODO: Will need another IF check to see if the user has been updated.
        console.log('Existing user ' +  + ' updated');
        chrome.storage.local.set({ usersList: updateUser(data.usersList, foundUser, { lastContacted: formatDate(new Date()) }, additionalFields) }, function () {});
      } else {
        // NOTE: Add fresh user to the database
        const newUser = Object.assign({}, foundUser, { lastContacted: formatDate(new Date()) }, additionalFields);
        console.log('New user added: ' +  + ' !');
        chrome.storage.local.set({ usersList: data.usersList.concat(newUser) }, function () {});
      }
    } else {
      // NOTE: Initialise user list
      chrome.storage.local.set({ usersList: [{ u: newUsername, l: formatDate(new Date()), r: 'u' }] }, function () {});        
    }
  });
}

function updateUser(usersList, userToUpdate, fieldObject, additionalFields) {
  return usersList.map(user => {
    if (user.username === userToUpdate.username) {
      return Object.assign({}, userToUpdate, fieldObject, additionalFields);
    } return user;
  });
}

function formatDate(date) {
  // var monthNames = [
  //   "Jan", "Feb", "Mar",
  //   "Apr", "May", "Jun", "Jul",
  //   "Aug", "Sep", "Oct",
  //   "Nov", "Dec"
  // ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  if (monthIndex <= 9) {
    monthIndex = '0' + monthIndex;
  }

  var year = date.getFullYear();

  // return day + '-' + monthNames[monthIndex] + '-' + year;
  return year + '-' + monthIndex + '-' + day;
}



// Array.from(document.querySelectorAll('.usertext-edit textarea')).forEach(element => {
//   if (element.value) {
//     // Update last message saved?

//   }
// });
