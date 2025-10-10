import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Cpu, Database, Server, CheckCircle, XCircle } from "lucide-react";

export default function SystemHealth() {
  const services = [
    { name: "API Server", status: "online", uptime: "99.9%", responseTime: "45ms" },
    { name: "Database", status: "online", uptime: "99.8%", responseTime: "12ms" },
    { name: "AI Service", status: "online", uptime: "99.5%", responseTime: "1.2s" },
    { name: "Email Service", status: "online", uptime: "100%", responseTime: "150ms" },
    { name: "Storage", status: "online", uptime: "99.9%", responseTime: "30ms" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">System Health</h1>
          <p className="text-purple-100">
            Giám sát hiệu năng và trạng thái server
          </p>
        </div>

        {/* Overall Status */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-4 py-8">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <div>
                <p className="text-3xl font-bold text-gray-900">All Systems Operational</p>
                <p className="text-gray-600 mt-1">All services are running normally</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">CPU Usage</p>
                  <p className="text-3xl font-bold text-gray-900">45%</p>
                </div>
                <Cpu className="w-10 h-10 text-blue-300" />
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Memory</p>
                  <p className="text-3xl font-bold text-gray-900">62%</p>
                </div>
                <Server className="w-10 h-10 text-purple-300" />
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Database</p>
                  <p className="text-3xl font-bold text-gray-900">2.4GB</p>
                </div>
                <Database className="w-10 h-10 text-green-300" />
              </div>
              <p className="text-xs text-gray-500 mt-4">of 50GB used</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Requests/min</p>
                  <p className="text-3xl font-bold text-gray-900">1.2K</p>
                </div>
                <Activity className="w-10 h-10 text-orange-300" />
              </div>
              <p className="text-xs text-gray-500 mt-4">Avg: 850/min</p>
            </CardContent>
          </Card>
        </div>

        {/* Services Status */}
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-bold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">
                        Uptime: {service.uptime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Response Time</p>
                      <p className="font-bold text-gray-900">{service.responseTime}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Online
                    </span>
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

