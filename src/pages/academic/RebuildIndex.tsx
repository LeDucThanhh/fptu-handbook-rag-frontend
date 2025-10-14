import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Loader,
} from "lucide-react";

export default function RebuildIndex() {
  const [isRebuilding, setIsRebuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "processing" | "complete" | "error">("idle");

  const handleRebuild = () => {
    setIsRebuilding(true);
    setProgress(0);
    setStatus("processing");

    // Simulate rebuild process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRebuilding(false);
          setStatus("complete");
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Rebuild Index (RAG Sync)</h1>
          <p className="text-purple-100">
            Tái lập chỉ mục AI, theo dõi tiến trình và lỗi
          </p>
        </div>

        {/* Current Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trạng thái hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                <Database className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1">Total Documents</p>
                <p className="text-3xl font-bold text-blue-600">156</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1">Index Status</p>
                <p className="text-lg font-bold text-green-600">Up to date</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1">Last Rebuild</p>
                <p className="text-lg font-bold text-purple-600">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rebuild Control */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rebuild Index</CardTitle>
          </CardHeader>
          <CardContent>
            {status === "idle" && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  Nhấn nút bên dưới để tái tạo chỉ mục AI. Quá trình sẽ mất khoảng
                  3-5 phút.
                </p>
                <button
                  onClick={handleRebuild}
                  className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition font-semibold inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Bắt đầu Rebuild
                </button>
              </div>
            )}

            {status === "processing" && (
              <div className="py-8">
                <div className="flex items-center justify-center mb-6">
                  <Loader className="w-12 h-12 text-purple-500 animate-spin" />
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Đang xử lý...
                    </span>
                    <span className="text-sm font-bold text-purple-600">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600">
                  Vui lòng đợi, hệ thống đang tạo embeddings cho 156 documents...
                </p>
              </div>
            )}

            {status === "complete" && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Rebuild thành công!
                </h3>
                <p className="text-gray-600 mb-6">
                  Đã tạo lại chỉ mục cho 156 documents. Hệ thống AI đã cập nhật.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition font-semibold"
                >
                  Hoàn tất
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rebuild History */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử Rebuild</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lastRebuildLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{log.time}</p>
                      <p className="text-sm text-gray-600">
                        {log.documents} documents • {log.duration}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Success
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



