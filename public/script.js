document.querySelectorAll(".devour").forEach((button) => {
  button.addEventListener("click", function (event) {
    const id = this.getAttribute("data-id");

    fetch(`/api/burgers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) location.reload();
      console.log(response);
    });
  });
});

document.getElementById("create-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const newBurger = {
    name: document.getElementById("burgername").value.trim(),
    eaten: false,
  };

  fetch(`/api/burgers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBurger),
  }).then((response) => {
    console.log(response);
    if (response.ok) location.reload();
  });
});
