document.addEventListener('DOMContentLoaded', function () {
  if (
    document.location.pathname.includes('r/NoFap') || 
    document.location.pathname.includes('r/pornfree')
  ) {
    chrome.storage.local.set({ aLinkTotal: 0 }, function (data) {
      tagUsernames();
      chrome.storage.local.set({ aLinkTotal: document.querySelectorAll('a').length }, function (data) {
        document.addEventListener('scroll', function (e) {
          chrome.storage.local.get('aLinkTotal', function(data) {
            if (data.aLinkTotal !== document.querySelectorAll('a').length) {
              console.log(document.querySelectorAll('a').length - data.aLinkTotal + " New links appeared!");
              chrome.storage.local.set({ aLinkTotal: document.querySelectorAll('a').length }, function (data) {
                tagUsernames();
              });
            }
          });
        });
      });
    });
  }
});

function tagUsernames() {
  try {
    let totalUsernamesIdentified = 0;
    // let totalUsernamesUnidentified = 0;
    Array.from(document.querySelectorAll('a')).forEach(function(element) {

      /* TAG USERNAMES */
      const isAlreadyTagged = Array.from(element.classList).find(className => className === 'userAlreadyTagged');
      if (isAlreadyTagged) return;
      element.classList.add('userAlreadyTagged'); 
      /* TAG USERNAMES END */

      const newUsername = element.href.split('/')[4];
      if (element.pathname === ('/user/' + newUsername + '/')) {

        chrome.storage.local.get('usersList', function (data) {
          if (!data.usersList) return chrome.storage.local.set({ usersList: [] }, function (data) {});;
          // console.log(JSON.stringify(data.usersList));

          const foundUser = data.usersList.find(user => user.username === newUsername);
          
          if (foundUser) {
            changeUserColor(foundUser, element);

            const addUserInformationNode = addUserInformation(foundUser);
            element.parentNode.appendChild(addUserInformationNode);
  
            totalUsernamesIdentified += 1;
          } else {
            // totalUsernamesUnidentified += 1;
          }

          element.parentNode.style.display = 'flex';
          element.parentNode.style.alignItems = 'center';

          const addStartLinkNode = addStartLink(newUsername);
          element.parentNode.appendChild(addStartLinkNode);
        });
      }
    });

    console.log(totalUsernamesIdentified + " usernames tagged!");
    // console.log(totalUsernamesUnidentified + " unidentified usernames!");
  } catch(e) {
    alert('tagUsernames: ' + e);
  }
}

function changeUserColor(foundUser, element) {
  if (foundUser.didTheyGetBack) {
    element.style.color = 'blue';
  } else {
    element.style.color = 'red';
  }
}

function addUserInformation(foundUser) {
  const span = document.createElement("span");
  const spanTextNode = document.createTextNode("Last Contacted: " + foundUser.lastContacted + " ");
  span.appendChild(spanTextNode); 
  span.style.color = 'black';

  return span;
}

function addStartLink(newUsername) {
  const a = document.createElement("a");
  const aTextNode = document.createTextNode("START");
  a.appendChild(aTextNode);
  a.style.color = 'black';
  a.style.border = '1px solid black';
  a.style.borderRadius = '3px';
  a.style.padding= '8px';
  a.style.marginLeft = '6px';
  a.title = "START";
  a.href = 
    "https://www.reddit.com/message/compose/?to=" + newUsername + 
    
    "&subject=" + "Hey" + 
    
    "&message=" + startMessage() +

    "&auto=true";

  return a;
}

function startMessage() {
  return "Hey, I saw your post on r/NoFap. It's great to see you're starting your journey.\n" +
  
  "Definitely meditation was what made the biggest difference for me. It's hard convincing people to do it though, because I know I personally resisted it for years thinking it was pointless, but the moment I started doing it I felt like such an idiot for being so stubborn haha.\n" +
  
  "I think where most people go wrong is that they don't realise self-control and discipline comes from learning to let go in order to be calm and present. Instead, I think a lot of people think it's about forcing yourself through struggle or having \"willpower\", but once you experience being truly calm and present with yourself, then it completely changes how you think about self-control.\n" + 

  "So for me, I basically do 10 minutes of meditation each day and I would say that's enough for you to get started. It's what helped me get 300+ days fairly effortlessly." +

  "More than happy to answer any questions :)"
}
