import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Filter } from "lucide-react";
import { mockAuditLogs } from "@/services/mock/mockData";

export default function AuditLogs() {
  const [logs] = useState(mockAuditLogs);
  const [filter, setFilter] = useState<"all" | "success" | "error">("all");

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
          <p className="text-purple-100">
            Theo dõi hoạt động và lỗi hệ thống
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-purple-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tất cả ({logs.length})
            </button>
            <button
              onClick={() => setFilter("success")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "success"
                  ? "bg-purple-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Success
            </button>
            <button
              onClick={() => setFilter("error")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "error"
                  ? "bg-purple-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Error
            </button>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm logs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lịch sử hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      log.status === "success"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <FileText
                      className={`w-5 h-5 ${
                        log.status === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-bold text-gray-900">{log.action}</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      User: {log.user}
                    </p>

                    {log.details && (
                      <p className="text-sm text-gray-500 mb-2">
                        {log.details}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{log.timestamp}</span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



