function wrapDynamicContent() {
  dynamicServerNames();
  dynamicAuthenticationToken();
  dynamicIntegrationId();
}

/*
When the page has loaded we wrap all occurrences of the server name with a <span/> then we attach
an event_handler to the serverSelect in index.html.md. This allows us the user to change between
the prod and demo server in the documentation.
 */
function dynamicServerNames() {
  let input = $('input[type=radio]');
  let placeholder = 'https://api.gigapay.se/v2/';
  let value = $('input[type=radio]:checked')[0].value.replace('///', '//');  // remove escaping necessary in .md file

  let span = document.createElement('span');
  span.className = 'hostServer';
  span.innerHTML = value || placeholder;

  for (const element of document.querySelectorAll("code")) {
    if (element.innerText.includes(placeholder)) {
      element.innerHTML = element.innerHTML.replaceAll(placeholder, span.outerHTML);
    }
  }

  input.click(function() {
    let choice = this.value.replace('///', '//');
    $(".hostServer").map(function() {
      this.innerText = choice;
    })
  });
}

/*
Then we do the same for the Authentication Token input.
 */
function dynamicAuthenticationToken() {
  let inputs = $('#auth')
  let placeholder =  inputs[0].placeholder
  let value = inputs[0].value

  let span = document.createElement('span');
  span.className = 'authenticationToken';
  span.innerHTML = value || placeholder;

  for (const element of document.querySelectorAll("code")) {
    if (element.innerText.includes(placeholder)) {
      element.innerHTML = element.innerHTML.replaceAll(placeholder, span.outerHTML);
    }
  }

  inputs.on('input', function() {
    let value = this.value;
    $(".authenticationToken").map(function() {
      this.innerText = value ? value : placeholder;
    })
  });
}

/*
And the Integration ID input.
 */
function dynamicIntegrationId() {
  let inputs = $('#integration');
  let placeholder =  inputs[0].placeholder
  let value = inputs[0].value

  let span = document.createElement('span');
  span.className = 'integrationToken';
  span.innerHTML = value || placeholder;

  for (const element of document.querySelectorAll("code")) {
    if (element.innerText.includes(placeholder)) {
      element.innerHTML = element.innerHTML.replaceAll(placeholder, span.outerHTML);
    }
  }

  inputs.on('input', function() {
    let value = this.value;
    $(".integrationToken").map(function() {
      this.innerText = value ? value : placeholder;
    })
  });
}
