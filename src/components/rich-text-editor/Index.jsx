import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import MenuBar from "./MenuBar";
import { hasError } from "../../helpers/errorHelpers";
import "./rich-text-editor.css";

export default function RichTextEditor({
  name,
  value,
  onChange = () => {},
  errors = {},
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            style: "list-style-type: disc; margin-left: 0.75rem;",
          },
        },
        orderedList: {
          HTMLAttributes: {
            style: "list-style-type: decimal; margin-left: 0.75rem;",
          },
        },
      }),
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "rich-text-editor__content",
        style:
          "min-height: 150px; outline: none; border-radius: 2px; background-color: var(--base-100); padding: 0rem 0.75rem;",
      },
    },
    onUpdate: ({ editor }) => {
      onChange({
        target: {
          type: "rich-editor",
          name: name,
          value: editor.getHTML(),
        },
      });
    },
  });

  const isError = hasError(name, errors);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        borderRadius: "2px",
        border: `1px solid ${isError ? "#ef4444" : "#d1d5db"}`,
      }}
      className="rich-text-editor"
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
