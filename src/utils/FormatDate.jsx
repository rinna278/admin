function formatDate(dateString) {
  const date = new Date(dateString); // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  const year = date.getFullYear();

  // Định dạng theo "dd/mm/yyyy"
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
}

export default formatDate;
