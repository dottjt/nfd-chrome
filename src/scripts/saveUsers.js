// SAVE USERS WHEN SCROLLING MESSAGES
document.addEventListener('DOMContentLoaded', function () {
  if (
    document.location.pathname.includes('message/messages') || 
    document.location.pathname.includes('message/inbox')
  ) {
    document.addEventListener('scroll', function (event) {
      saveUsersWhenScrollingMessages(event);
    });
  }
});

// SAVE USERS WHEN SENDING MESSAGE
document.addEventListener('keypress', function (event) {
  if (document.location.href.includes('message/compose')) {
    saveUserWhenSendingMessage(event);
  }
});
 
function saveUsersWhenScrollingMessages(event) {
  
}

function saveUserWhenSendingMessage(event) {
  try {
    var key = event.which || event.keyCode;

    if (key === 13) {
      const inputElement = document.querySelector('[name="to"]');
      const newUsername = inputElement.value;

      saveNewUserToDatabase(newUsername);
    }
  } catch(e) {
    alert('saveUserWhenSendingMessage: ' + e);
  }
}

function saveNewUserToDatabase(newUsername) {
  chrome.storage.local.get('usersList', function (data) {
    // console.log(JSON.stringify(data.usersList));
    if (data.usersList && data.usersList.length > 0) {
      const foundUser = data.usersList.find(user => user.username === newUsername);

      // NODE: Update user if sending message AGAIN
      if (foundUser) {
        chrome.storage.local.set({ usersList: updateUser(data.usersList, foundUser, { lastContacted: formatDate(new Date()) }) }, function () {});
      } else {
        // NOTE: Add fresh user to the database
        chrome.storage.local.set({ usersList: data.usersList.concat(Object.assign({}, foundUser, { lastContacted: formatDate(new Date()) })) }, function () {});
      }
    } else {
      // NOTE: Initialise user list
      chrome.storage.local.set({ usersList: [{ username: newUsername, lastContacted: formatDate(new Date()), firstContacted: formatDate(new Date()), didTheyGetBack: false }] }, function () {});        
    }
  });
}

function updateUser(usersList, userToUpdate, fieldObject) {
  return usersList.map(user => {
    if (user.username === userToUpdate.username) {
      return Object.assign({}, userToUpdate, fieldObject);
    } return user;
  });
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}



// Array.from(document.querySelectorAll('.usertext-edit textarea')).forEach(element => {
//   if (element.value) {
//     // Update last message saved?

//   }
// });
