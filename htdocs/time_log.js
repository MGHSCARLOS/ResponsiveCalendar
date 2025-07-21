function timeIn() {
  const now = new Date().toISOString();
  fetch("time_in.php", {
    method: "POST",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `time=${now}`
  }).then(() => alert("Time In recorded!"));
}

function timeOut() {
  const now = new Date().toISOString();
  fetch("time_out.php", {
    method: "POST",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `time=${now}`
  }).then(() => alert("Time Out recorded!"));
}
