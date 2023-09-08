const inputElement = document.querySelector(".search_box");
const suggestionBody = document.querySelector(".suggestions-body");

inputElement.addEventListener("input", () => {
  handleSearchText(inputElement.value);
});

inputElement.addEventListener("focus", () => {
  if (inputElement.value !== "");
  else suggestionBody.style.display = "block";
});

inputElement.addEventListener("blur", () => {
  if (inputElement.value === "") suggestionBody.style.display = "none";
});

const handleSearchText = async (query) => {
  try {
    if (query === "") {
      suggestionBody.innerHTML = "";
      suggestionBody.style.display = "none";
      return;
    }
    let res = await fetch(`https://demo.dataverse.org/api/search?q=${query}`);
    res = await res.json();
    const data = res?.data?.items;
    const dataSize = res?.data?.total_count;
    if (dataSize === 0) {
      const newElement = document.createElement("div");
      newElement.textContent = "NO DATA FOUND";
    } else {
      data.forEach((item) => {
        const newElement = document.createElement("div");
        newElement.textContent = item.name;
        suggestionBody.appendChild(newElement);
      });
    }
    suggestionBody.style.display = "block";
  } catch (err) {
    console.log(err);
  }
};