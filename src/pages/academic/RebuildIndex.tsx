import { useState } from "react";
import { Card, Modal, notification } from "antd";
import { RefreshCw, CheckCircle, Clock, Database, Loader } from "lucide-react";

export default function RebuildIndex() {
  const [, setIsRebuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "processing" | "complete" | "error"
  >("idle");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRebuildClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmRebuild = () => {
    setShowConfirmModal(false);
    setIsRebuilding(true);
    setProgress(0);
    setStatus("processing");

    notification.info({
      message: "Đang xử lý",
      description: "Bắt đầu rebuild index...",
      placement: "topRight",
      duration: 3,
    });

    // Simulate rebuild process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRebuilding(false);
          setStatus("complete");
          notification.success({
            message: "Thành công",
            description: "Rebuild index hoàn tất!",
            placement: "topRight",
            duration: 3,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const lastRebuildLogs = [
    {
      time: "2024-10-09 14:30:00",
      status: "success",
      duration: "3m 45s",
      documents: 156,
    },
    {
      time: "2024-10-08 09:15:00",
      status: "success",
      duration: "3m 20s",
      documents: 154,
    },
    {
      time: "2024-10-07 16:45:00",
      status: "success",
      duration: "3m 55s",
      documents: 152,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Rebuild AI Index</h1>
          <p className="text-gray-600">Tái lập chỉ mục AI cho hệ thống RAG</p>
        </div>

        {/* Horizontal Layout: Status + Rebuild Control */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Status - Left Side */}
          <Card
            className="shadow-md"
            title={
              <span className="text-lg font-semibold">Trạng thái hệ thống</span>
            }
          >
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <Database className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Documents</p>
                      <p className="text-2xl font-bold text-orange-600">156</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Index Status</p>
                      <p className="text-lg font-bold text-orange-600">
                        Up to date
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Last Rebuild</p>
                      <p className="text-lg font-bold text-orange-600">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Rebuild Control - Right Side */}
          <Card
            className="shadow-md"
            title={<span className="text-lg font-semibold">Rebuild Index</span>}
          >
            <div className="p-6">
              {status === "idle" && (
                <div className="h-full flex flex-col justify-center">
                  <div className="text-center">
                    <RefreshCw className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-6">
                      Nhấn nút bên dưới để tái tạo chỉ mục AI. Quá trình sẽ mất
                      khoảng 3-5 phút.
                    </p>
                    <button
                      onClick={handleRebuildClick}
                      className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-semibold inline-flex items-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Bắt đầu Rebuild
                    </button>
                  </div>
                </div>
              )}

              {status === "processing" && (
                <div className="py-8">
                  <div className="flex items-center justify-center mb-6">
                    <Loader className="w-12 h-12 text-orange-500 animate-spin" />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Đang xử lý...
                      </span>
                      <span className="text-sm font-bold text-orange-600">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-orange-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Vui lòng đợi, hệ thống đang tạo embeddings cho 156
                    documents...
                  </p>
                </div>
              )}

              {status === "complete" && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Rebuild thành công!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Đã tạo lại chỉ mục cho 156 documents. Hệ thống AI đã cập
                    nhật.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                  >
                    Hoàn tất
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Rebuild History - Full Width */}
        <Card
          className="shadow-md"
          title={<span className="text-lg font-semibold">Lịch sử Rebuild</span>}
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lastRebuildLogs.map((log, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                      Success
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {log.time}
                  </p>
                  <p className="text-xs text-gray-600">
                    {log.documents} documents • {log.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Confirm Rebuild Modal */}
      <Modal
        title={
          <span className="text-xl font-semibold">Xác nhận Rebuild Index</span>
        }
        open={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onOk={handleConfirmRebuild}
        okText="Bắt đầu Rebuild"
        cancelText="Hủy"
        width={600}
        okButtonProps={{ className: "bg-orange-500 hover:bg-orange-600" }}
      >
        <div className="space-y-4 py-4">
          <p className="text-gray-700">
            <strong>Cảnh báo:</strong> Quá trình rebuild index sẽ ảnh hưởng đến
            toàn bộ hệ thống.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Thời gian dự kiến: 3-5 phút</li>
            <li>Hệ thống AI có thể hoạt động chậm trong quá trình rebuild</li>
            <li>Tất cả dữ liệu handbook sẽ được đánh chỉ mục lại</li>
          </ul>
          <p className="text-gray-700 font-medium">
            Bạn có chắc chắn muốn tiếp tục?
          </p>
        </div>
      </Modal>
    </div>
  );
}
