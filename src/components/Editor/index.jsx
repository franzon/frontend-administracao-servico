import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Editor({ value = EditorState.createEmpty(), onChange }) {
  const [editorState, setEditorState] = useState(value);

  function onEditorStateChange(state) {
    setEditorState(state);

    if (onChange) onChange(state);
  }

  return (
    <DraftEditor
      editorState={value || editorState}
      onEditorStateChange={onEditorStateChange}
    />
  );
}

export default Editor;
