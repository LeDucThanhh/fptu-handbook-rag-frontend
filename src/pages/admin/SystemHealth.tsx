import { Card } from "antd";
import { Activity, Cpu, Database, Server, CheckCircle } from "lucide-react";

export default function SystemHealth() {
  const services = [
    {
      name: "API Server",
      status: "online",
      uptime: "99.9%",
      responseTime: "45ms",
    },
    {
      name: "Database",
      status: "online",
      uptime: "99.8%",
      responseTime: "12ms",
    },
    {
      name: "AI Service",
      status: "online",
      uptime: "99.5%",
      responseTime: "1.2s",
    },
    {
      name: "Email Service",
      status: "online",
      uptime: "100%",
      responseTime: "150ms",
    },
    {
      name: "Storage",
      status: "online",
      uptime: "99.9%",
      responseTime: "30ms",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">System Health</h1>
          <p className="text-gray-600">
            Giám sát hiệu năng và trạng thái server
          </p>
        </div>

        {/* Overall Status */}
        <Card className="mb-8 shadow-md">
          <div className="pt-6">
            <div className="flex items-center justify-center gap-4 py-8">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  All Systems Operational
                </p>
                <p className="text-gray-600 mt-1">
                  All services are running normally
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-md">
            <div className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">CPU Usage</p>
                  <p className="text-3xl font-bold text-gray-900">45%</p>
                </div>
                <Cpu className="w-10 h-10 text-orange-400" />
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Memory</p>
                  <p className="text-3xl font-bold text-gray-900">62%</p>
                </div>
                <Server className="w-10 h-10 text-orange-400" />
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "62%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Database</p>
                  <p className="text-3xl font-bold text-gray-900">2.4GB</p>
                </div>
                <Database className="w-10 h-10 text-orange-400" />
              </div>
              <p className="text-xs text-gray-500 mt-4">of 50GB used</p>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Requests/min</p>
                  <p className="text-3xl font-bold text-gray-900">1.2K</p>
                </div>
                <Activity className="w-10 h-10 text-orange-400" />
              </div>
              <p className="text-xs text-gray-500 mt-4">Avg: 850/min</p>
            </div>
          </Card>
        </div>

        {/* Services Status */}
        <Card
          className="shadow-md"
          title={
            <span className="text-lg font-semibold">Trạng thái dịch vụ</span>
          }
        >
          <div className="p-6">
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
                      <p className="font-bold text-gray-900">
                        {service.responseTime}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Online
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
