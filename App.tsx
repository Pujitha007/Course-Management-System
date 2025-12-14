import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { SchemaViewer } from './components/SchemaViewer';
import { CodeViewer } from './components/CodeViewer';
import { DashboardMockup } from './components/DashboardMockup';
import { GeneratedArtifacts, Tab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [artifacts, setArtifacts] = useState<GeneratedArtifacts>({
    schema: '',
    javaFiles: [],
    diagramData: { nodes: [], links: [] }
  });

  const handleArtifactsGenerated = (newArtifacts: GeneratedArtifacts) => {
    setArtifacts(newArtifacts);
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'chat' && (
        <ChatInterface 
          onArtifactsGenerated={handleArtifactsGenerated} 
          onSwitchTab={setActiveTab}
        />
      )}
      {activeTab === 'schema' && (
        <SchemaViewer schema={artifacts.schema} />
      )}
      {activeTab === 'code' && (
        <CodeViewer files={artifacts.javaFiles} />
      )}
      {activeTab === 'preview' && (
        <DashboardMockup />
      )}
    </Layout>
  );
}