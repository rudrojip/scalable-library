import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import TypedInputNumber from "antd/es/input-number";
const AddBook = () => {
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      size={"large"}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Book Name">
        <Input />
      </Form.Item>
      <Form.Item label="Author">
        <Input />
      </Form.Item>
      <Form.Item label="Language">
        <Select>
          <Select.Option value="English">English</Select.Option>
          <Select.Option value="French">French</Select.Option>
          <Select.Option value="Hindi">Hindi</Select.Option>
          <Select.Option value="Telugu">Telugu</Select.Option>
          <Select.Option value="Spanish">Spanish</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Published year">
        <InputNumber
          min={1900}
          max={new Date().getFullYear()}
          controls={false}
        />
      </Form.Item>
      <Form.Item label="Stock Left">
        <InputNumber min={1} max={1000} controls={false} />
      </Form.Item>
      <Form.Item label="Price">
        <TypedInputNumber controls={false} />
      </Form.Item>
      <Form.Item label="Publish" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Button>Submit</Button>
    </Form>
  );
};
export default AddBook;
