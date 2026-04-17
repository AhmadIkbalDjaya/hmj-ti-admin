import { Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import {
  TbAlignCenter,
  TbAlignJustified,
  TbAlignLeft,
  TbAlignRight,
  TbBold,
  TbH1,
  TbH2,
  TbH3,
  TbHighlight,
  TbItalic,
  TbLetterP,
  TbList,
  TbListNumbers,
  TbStrikethrough,
} from "react-icons/tb";

export default function MenuBar({ editor = null }) {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    if (!editor) return null;

    const updateHandler = () => setUpdate((prev) => prev + 1);

    // listen ke perubahan editor
    editor.on("update", updateHandler);
    editor.on("selectionUpdate", updateHandler);

    return () => {
      editor.off("update", updateHandler);
      editor.off("selectionUpdate", updateHandler);
    };
  }, [editor]);

  if (!editor) return null;

  const options = [
    {
      icon: <TbH1 />,
      label: "Heading 1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <TbH2 />,
      label: "Heading 2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <TbH3 />,
      label: "Heading 3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <TbLetterP />,
      label: "Paragraph",
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <TbBold />,
      label: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <TbItalic />,
      label: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <TbStrikethrough />,
      label: "Strikethrough",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <TbHighlight />,
      label: "Highlight",
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <TbAlignLeft />,
      label: "Align Left",
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <TbAlignCenter />,
      label: "Align Center",
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <TbAlignRight />,
      label: "Align Right",
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <TbAlignJustified />,
      label: "Justify",
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
    },
    {
      icon: <TbList />,
      label: "List",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <TbListNumbers />,
      label: "Ordered List",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: "0.25rem",
        borderBottom: "1px solid #d1d5db",
        padding: "0.125rem 0.5rem",
        color: "#4b5563",
      }}
    >
      {options.map((option, index) => (
        <Tooltip key={index} title={option.label} placement="top" arrow>
          <Button
            key={index}
            onClick={option.onClick}
            variant={option.pressed ? "contained" : "text"}
            size="small"
            sx={{ minWidth: 36, px: 0.5 }}
          >
            {option.icon}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
