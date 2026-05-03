import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8 px-4 md:px-12 max-w-5xl mx-auto w-full text-textSecondary">
      <div className="flex gap-6 mb-6">
        <a href="#" className="hover:text-white transition font-bold text-lg">Facebook</a>
        <a href="#" className="hover:text-white transition font-bold text-lg">Instagram</a>
        <a href="#" className="hover:text-white transition font-bold text-lg">Twitter</a>
        <a href="#" className="hover:text-white transition font-bold text-lg">YouTube</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
        <div className="flex flex-col gap-3">
          <a href="#" className="hover:underline">Âm thanh và Phụ đề</a>
          <a href="#" className="hover:underline">Trung tâm đa phương tiện</a>
          <a href="#" className="hover:underline">Quyền riêng tư</a>
          <a href="#" className="hover:underline">Liên hệ với chúng tôi</a>
        </div>
        <div className="flex flex-col gap-3">
          <a href="#" className="hover:underline">Mô tả âm thanh</a>
          <a href="#" className="hover:underline">Quan hệ với nhà đầu tư</a>
          <a href="#" className="hover:underline">Thông báo pháp lý</a>
        </div>
        <div className="flex flex-col gap-3">
          <a href="#" className="hover:underline">Trung tâm trợ giúp</a>
          <a href="#" className="hover:underline">Việc làm</a>
          <a href="#" className="hover:underline">Tùy chọn cookie</a>
        </div>
        <div className="flex flex-col gap-3">
          <a href="#" className="hover:underline">Thẻ quà tặng</a>
          <a href="#" className="hover:underline">Điều khoản sử dụng</a>
          <a href="#" className="hover:underline">Thông tin doanh nghiệp</a>
        </div>
      </div>

      <button className="border border-gray-500 text-gray-400 px-4 py-2 text-sm mb-6 hover:text-white hover:border-white transition">
        Mã dịch vụ
      </button>

      <div className="text-xs">
        &copy; {new Date().getFullYear()} AnkiPlus Phim, Inc.
      </div>
    </footer>
  );
}
