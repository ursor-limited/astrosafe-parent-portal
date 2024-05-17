"use client";

/* from https://medium.com/@mircea.calugaru/react-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375 */

import React, { useEffect } from "react";

// // Undo and redo functions for Custom Toolbar
// function undoChange() {
//   this.quill.history.undo();
// }
// function redoChange() {
//   this.quill.history.redo();
// }

// Modules object for setting up the Quill editor
export const getModules = (id: string) => ({
  clipboard: { matchVisual: false }, // needed to prevent space being inserted above lists
  toolbar: {
    container: `#${id}`,
    // handlers: {
    //   undo: undoChange,
    //   redo: redoChange,
    // },
  },
  //size: ["small", "large", "huge"],
  //   history: {
  //     delay: 500,
  //     maxStack: 100,
  //     userOnly: true,
  //   },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  //   "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  // "script",
  //"blockquote",
  "background",
  "list",
  "bullet",
  //   "indent",
  "link",
  //   "image",
  "color",
  // "code-block",
];

const initQuill = async () => {
  const Quill = (await import("react-quill")).Quill;
  if (Quill) {
    // Add sizes to whitelist and register them
    const Size = Quill.import("formats/size");
    Size.whitelist = ["extra-small", "small", "medium", "large", "huge"];
    Quill.register(Size, true);

    // Add fonts to whitelist and register them
    const Font = Quill.import("formats/font");
    Font.whitelist = [
      "arial",
      "comic-sans",
      "courier-new",
      "georgia",
      "helvetica",
      "lucida",
    ];
    Quill.register(Font, true);
  }
};

// Quill Toolbar component
export const TextEditorToolbar = (props: { id: string }) => {
  useEffect(() => {
    initQuill();
  }, []);
  return (
    <div
      id={props.id}
      style={{
        background: "rgb(255,255,255)",
        fontFamily: "unset",
        borderRadius: "12px 12px 0 0",
      }}
    >
      <span className="ql-formats">
        {/* <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select> */}
        <select className="ql-size" defaultValue="medium">
          <option value="small">Small</option>
          {/* <option value="normal">Normal</option> */}
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select>
        {/* <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select> */}
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        {/* <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" /> */}
      </span>
      <span className="ql-formats">
        {/* <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" /> */}
        {/* <button className="ql-blockquote" /> */}
        {/* <button className="ql-direction" /> */}
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
        {/* <button className="ql-image" />
      <button className="ql-video" /> */}
      </span>
      {/* <span className="ql-formats">
        <button className="ql-formula" />
        <button className="ql-code-block" />
        <button className="ql-clean" />
      </span> */}
      {/* <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span> */}
    </div>
  );
};

export default TextEditorToolbar;
