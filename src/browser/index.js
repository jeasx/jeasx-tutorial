// Ask for confirmation before submitting forms with a data-confirm attribute.
document.querySelectorAll("form[data-confirm]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    if (!confirm(form.dataset.confirm)) {
      event.preventDefault();
    }
  });
});

// Remove the skeleton animation once a cover image has loaded (or failed).
document.querySelectorAll("img.cover").forEach((img) => {
  const done = () => img.classList.add("loaded");
  if (img.complete) {
    done();
  } else {
    img.addEventListener("load", done);
    img.addEventListener("error", done);
  }
});
