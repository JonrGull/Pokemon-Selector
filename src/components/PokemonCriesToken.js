const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

xhr.open("POST", "https://api.pkmnapi.com/v1/access_tokens", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(
  JSON.stringify({
    data: {
      type: "access_tokens",
      attributes: {
        email_address: "jonrgull2@gmail.com",
      },
    },
  })
);
