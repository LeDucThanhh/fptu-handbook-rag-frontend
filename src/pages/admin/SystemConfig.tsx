import { useState, useEffect } from "react";
import { Card } from "antd";
import { Settings, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
} from "antd";
import { systemConfigService } from "@/services/api";
import type { SystemConfiguration } from "@/services/api/system-config.service";

const { Option } = Select;

export default function SystemConfig() {
  const [configs, setConfigs] = useState<SystemConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConfig, setEditingConfig] =
    useState<SystemConfiguration | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập lại");
        return;
      }

      const data = await systemConfigService.getAll(token);
      setConfigs(data);
    } catch (error: any) {
      console.error("Error fetching configs:", error);
      message.error(
        error.response?.data?.message || "Không thể tải cấu hình hệ thống"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingConfig(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (config: SystemConfiguration) => {
    setEditingConfig(config);
    form.setFieldsValue(config);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập lại");
        return;
      }

      await systemConfigService.delete(id, token);
      message.success("Xóa cấu hình thành công!");
      fetchConfigs();
    } catch (error: any) {
      console.error("Error deleting config:", error);
      message.error(error.response?.data?.message || "Không thể xóa cấu hình");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập lại");
        return;
      }

      if (editingConfig) {
        await systemConfigService.update(editingConfig.id, values, token);
        message.success("Cập nhật cấu hình thành công!");
      } else {
        await systemConfigService.create(values, token);
        message.success("Thêm cấu hình thành công!");
      }

      setIsModalOpen(false);
      form.resetFields();
      fetchConfigs();
    } catch (error: any) {
      console.error("Error saving config:", error);
      message.error(error.response?.data?.message || "Không thể lưu cấu hình");
    }
  };

  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      render: (text: string) => <code className="text-sm">{text}</code>,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text: string) => (
        <span className="text-sm text-gray-700">{text}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => <Tag color="orange">{text || "General"}</Tag>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <span className="text-sm text-gray-500">{text || "-"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SystemConfiguration) => (
        <div className="flex items-center gap-2">
          <Button
            type="link"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Xóa cấu hình?"
            description="Bạn có chắc chắn muốn xóa cấu hình này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger icon={<Trash2 className="w-4 h-4" />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Cấu hình hệ thống</h1>
            <p className="text-gray-600">
              Quản lý cấu hình hệ thống, API keys và tham số
            </p>
          </div>
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleAdd}
            size="large"
            className="bg-orange-500 hover:bg-orange-600"
          >
            Thêm cấu hình
          </Button>
        </div>

        {/* System Configurations Table */}
        <Card
          className="shadow-md"
          title={
            <span className="text-lg font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-orange-500" />
              Danh sách cấu hình ({configs.length})
            </span>
          }
        >
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
                <p className="text-gray-500">Đang tải cấu hình...</p>
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={configs}
                rowKey="id"
                pagination={false}
                locale={{
                  emptyText: "Chưa có cấu hình nào",
                }}
              />
            )}
          </div>
        </Card>

        {/* Add/Edit Config Modal */}
        <Modal
          title={editingConfig ? "Chỉnh sửa cấu hình" : "Thêm cấu hình mới"}
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
          }}
          okText={editingConfig ? "Cập nhật" : "Thêm"}
          cancelText="Hủy"
          width={600}
        >
          <Form form={form} layout="vertical" className="mt-4">
            <Form.Item
              name="key"
              label="Key"
              rules={[{ required: true, message: "Vui lòng nhập key" }]}
            >
              <Input placeholder="AI_MODEL" disabled={!!editingConfig} />
            </Form.Item>

            <Form.Item
              name="value"
              label="Value"
              rules={[{ required: true, message: "Vui lòng nhập value" }]}
            >
              <Input placeholder="GPT-4" />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select placeholder="Chọn category">
                <Option value="AI">AI</Option>
                <Option value="API">API</Option>
                <Option value="Database">Database</Option>
                <Option value="Email">Email</Option>
                <Option value="General">General</Option>
              </Select>
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Mô tả cấu hình..." rows={3} />
            </Form.Item>

            <Form.Item name="isActive" label="Status" initialValue={true}>
              <Select>
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
