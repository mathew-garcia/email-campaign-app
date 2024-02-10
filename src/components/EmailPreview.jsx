import React from 'react';

const EmailPreview = ({ selectedTemplate }) => {
  // Check if selectedTemplate exists and has valid HTML
  if (!selectedTemplate || typeof selectedTemplate.html !== 'string') {
    return <p>Error: Invalid HTML content</p>;
  }

  return (
    <div className="email-preview">
      <div dangerouslySetInnerHTML={{ __html: selectedTemplate.html }} />
    </div>
  );
};

export default EmailPreview;
