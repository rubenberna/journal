import React, { useCallback, useMemo, useState, useEffect } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faCode,
  faListUl,
  faQuoteLeft,
  faDiceOne,
  faDiceTwo,
} from "@fortawesome/free-solid-svg-icons";

import {
  Toolbar,
  BlockQuote,
  BulletList,
  HeadingOne,
  HeadingTwo,
  ListItem,
  DefaultElement,
} from "./TextEditorUtils";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const TextEditor = () => {
  const [value, setValue] = useState(initialValue);
  const [isClient, setIsClient] = useState(false);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => setIsClient(true), []);

  //Slate only executes on the client-side
  if (!isClient) {
    return null;
  }

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <div className="bg-white px-10 my-8 rounded min-h-full pb-2">
        <Toolbar>
          <MarkButton format="bold" icon={faBold} />
          <MarkButton format="italic" icon={faItalic} />
          <MarkButton format="underline" icon={faUnderline} />
          <MarkButton format="code" icon={faCode} />
          <BlockButton format="heading-one" icon={faDiceOne} />
          <BlockButton format="heading-two" icon={faDiceTwo} />
          <BlockButton format="block-quote" icon={faQuoteLeft} />
          <BlockButton format="bulleted-list" icon={faListUl} />
        </Toolbar>
        <Editable
          className="bg-white w-2/3 px-10 my-8 rounded"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </div>
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = (props) => {
  switch (props.element.type) {
    case "block-quote":
      return <BlockQuote {...props} />;
    case "bulleted-list":
      return <BulletList {...props} />;
    case "heading-one":
      return <HeadingOne {...props} />;
    case "heading-two":
      return <HeadingTwo {...props} />;
    case "list-item":
      return <ListItem {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code className="text-gray-800 bg-gray-100">{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  } else console.log(leaf);

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  let active = isBlockActive(editor, format);
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`hover:text-gray-800 ${
        active ? "text-gray-800" : "text-gray-400"
      }`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    />
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  let active = isMarkActive(editor, format);
  return (
    <>
      <FontAwesomeIcon
        icon={icon}
        className={`hover:text-gray-800 ${
          active ? "text-gray-800" : "text-gray-400"
        }`}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      />
    </>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default TextEditor;
