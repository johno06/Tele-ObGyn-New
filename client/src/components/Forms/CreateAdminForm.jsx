import { Form, Input, Button, Card } from "antd";

function CreateAdminForm({ form, onFinish }) {
  return (
    <Card bordered={false} className="criclebox tablespace mb-24" style={{padding: 20}}>
      <Form form={form} onFinish={onFinish}>
        <h1 className="card-title mt-3 mb-4">Create a Secretary Account</h1>
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please input username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered did not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" danger htmlType="submit">
            Create Admin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default CreateAdminForm;
