document.addEventListener('DOMContentLoaded', function () {
  if (
    document.location.href.includes("www.reddit.com/message/compose") &&  
    document.location.href.includes("to") &&  
    document.location.href.includes("subject") &&  
    document.location.href.includes("message") &&  
    document.location.href.includes("auto")
  ) {
    const username = document.location.search.split("&")[0].split("=")[1];

    // document.querySelector('#send').click();
    console.log('Message sent to ' + username + "!");
  }
});
