/**
 * Auto-scroll the chat to the bottom
 * @param handle
 * @returns {}
 */
scrollToBottom = function() {
  $('#chatworks-messages').animate({scrollTop: 999999}, 200);
};
