import React, { useState } from 'react';
import { Modal, Form, Input, Button, Rate, message } from 'antd';

const { TextArea } = Input;

const FeedbackForm = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // Here you would typically make an API call to submit the feedback
      console.log('Feedback submitted:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('Thank you for your feedback!');
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      message.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Share Your Feedback"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="rating"
          label="How would you rate your experience?"
          rules={[{ required: true, message: 'Please provide a rating' }]}
        >
          <Rate allowHalf />
        </Form.Item>
        <Form.Item
          name="comments"
          label="Your Feedback"
          rules={[
            {
              required: true,
              message: 'Please share your feedback',
            },
          ]}
        >
          <TextArea rows={4} placeholder="Share your thoughts with us..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FeedbackForm;
