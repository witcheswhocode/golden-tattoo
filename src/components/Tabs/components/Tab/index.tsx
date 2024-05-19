import React, { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return <div>{children}</div>;
};

export default Tab;