import React from 'react';
import EditorPageContents from './EditorPageContents';
import { UserProvider } from '../components/UserContext';

async function FigmaPage() {
  return (
    <UserProvider>
      <EditorPageContents />
    </UserProvider>
  );
}

export default FigmaPage;
