function toggleFAQ(index) {
  const answer = document.getElementById(`answer-${index}`);
  const arrow = document.getElementById(`arrow-${index}`);

  if (answer.classList.contains("expanded")) {
    answer.classList.remove("expanded");
    arrow.classList.remove("expanded");
  } else {
    // Close all other FAQs
    for (let i = 0; i < 8; i++) {
      if (i !== index) {
        document.getElementById(`answer-${i}`).classList.remove("expanded");
        document.getElementById(`arrow-${i}`).classList.remove("expanded");
      }
    }

    answer.classList.add("expanded");
    arrow.classList.add("expanded");
  }
}
