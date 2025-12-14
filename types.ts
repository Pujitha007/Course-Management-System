export type Tab = 'chat' | 'schema' | 'code' | 'preview';

export interface JavaFile {
  name: string;
  content: string;
  type: 'entity' | 'controller' | 'repository' | 'service';
}

export interface GeneratedArtifacts {
  schema: string;
  javaFiles: JavaFile[];
  diagramData: {
    nodes: { id: string, label: string }[];
    links: { source: string, target: string }[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}