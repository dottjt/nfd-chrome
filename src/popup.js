// window.onmouseover = function(e) {
//   console.log(e.target.className);
//   lastClassName = e.target.className;
// };

console.log('popup.js')

// chrome.storage.sync.get('selectedMeditation', function (data) {
//   setNewMeditation(data.selectedMeditation);

//   previous__meditation__button.style.visibility = 'hidden';
// });

// previous__meditation__button.onclick = function(element) {
//   chrome.storage.sync.get(['selectedMeditation', 'meditationsList'], function (data) {
//     console.log('here');
//     const { isFirstOrLast, newMeditation } = getNextMeditation(data.selectedMeditation, data.meditationsList, -1);

//     console.log(isFirstOrLast, newMeditation);
//     disappearOrAppearFirstAndLast(isFirstOrLast, next__meditation__button);
//     setNewMeditation(newMeditation);
//   });
// };

// next__meditation__button.onclick = function (element) {
//   chrome.storage.sync.get(['selectedMeditation', 'meditationsList'], function (data) {
//     const { isFirstOrLast, newMeditation } = getNextMeditation(data.selectedMeditation, data.meditationsList, 1);

//     disappearOrAppearFirstAndLast(isFirstOrLast, previous__meditation__button);
//     setNewMeditation(newMeditation);
//   });
// };

// wipePage.onclick = function(element) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'document.body.style.display = "none";',
//     });
//   });
// };


// let lastClassName;

// window.onmouseover = function(e) {
//   console.log(e.target.className);
//   lastClassName = e.target.className;
// };


// // neutralise all a links
// const links = document.getElementsByTagName("a");
// for (let i = 0; i < links.length; i++){
//   links[i].addEventListener("click",function(e){
//     e.preventDefault();
//   });
// }

// const produceRedditString = (to, subject, message) => `https://www.reddit.com/message/compose/?to=${to}&subject=${subject}&message=${message}`

// window.onclick = function(e) {
//   navigator.clipboard.readText()
//     .then(text => {
//       console.log(produceRedditString(e.target.text, "Hey", encodeURI(text)))
      
//       window.open(
//         produceRedditString(e.target.text, "Hey", text),
//         '_blank' // <- This is what makes it open in a new window.
//       );
//     })
//     .catch(err => {
//       console.error('Failed to read clipboard contents: ', err);
//     });
// };
