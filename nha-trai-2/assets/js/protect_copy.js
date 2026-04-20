window.oncontextmenu = function () {
  return false;
};
document.onkeydown = function (e) {
  if ((e.ctrlKey || e.metaKey) && e.which == 85) {
    e.preventDefault();
    return false;
  }
};
// document.addEventListener("keydown", function (event) {
//   if (
//     event.key === "F12" ||
//     (event.ctrlKey && event.shiftKey && event.key === "I") ||
//     (event.ctrlKey && event.shiftKey && event.key === "J") ||
//     (event.ctrlKey && event.key === "U")
//   ) {
//     event.preventDefault();
//     alert("Không được phép!");
//   }
// });

(function () {
  const styleTitle = "font-size: 48px; font-weight: bold; color: red;";
  const styleMsg = "font-size: 16px;";

  console.log("%cDừng lại!", styleTitle);
  console.log(
    '%cĐây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng của LadiPage hoặc "hack" tài khoản của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào tài khoản của bạn.',
    styleMsg
  );
})();
