const form = document.querySelector("#add-book");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  fetch("http://43.203.50.204:8080/api/books", {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.ok) {
      alert("책이 성공적으로 등록되었습니다.");
      form.reset();
    } else {
      alert("책 등록을 실패했습니다. 다시 시도해주세요.");
    }
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const btn = document.querySelector("#btn_del");
//   btn.addEventListener("click", async () => {
//     try {
//       const response = await fetch(
//         `http://43.203.50.204:8080/api/books?id=38`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         alert("책이 성공적으로 삭제되었습니다.");
//         // 필요한 경우 삭제 후 작업을 수행합니다.
//       } else {
//         alert("책 삭제에 실패했습니다.");
//         // 필요한 경우 실패 시 처리를 수행합니다.
//       }
//     } catch (error) {
//       alert("책 삭제 중 오류가 발생했습니다:", error);
//       console.log(error);
//     }
//   });
// });
