import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { $isHeadingNode, $createHeadingNode } from '@lexical/rich-text';
import { $findMatchingParent } from '@lexical/utils';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  ListIcon,
  ListOrderedIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  CodeIcon,
} from 'lucide-react';
import { $createParagraphNode } from 'lexical';

interface ToolbarButtonProps {
  active: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isH1, setIsH1] = useState(false);
  const [isH2, setIsH2] = useState(false);
  const [isH3, setIsH3] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberList, setIsNumberList] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getKey() === 'root'
        ? anchorNode
        : $findMatchingParent(anchorNode, (e: any) => {
            const parent = e.getParent();
            return parent !== null && $isListNode(parent);
          }) || anchorNode;

      const elementDOM = editor.getElementByKey(element.getKey());
      if (elementDOM !== null) {
        setIsH1($isHeadingNode(element) && element.getTag() === 'h1');
        setIsH2($isHeadingNode(element) && element.getTag() === 'h2');
        setIsH3($isHeadingNode(element) && element.getTag() === 'h3');

        const parentList = $findMatchingParent(element, $isListNode);
        setIsBulletList(
          $isListNode(parentList) && parentList.getListType() === 'bullet'
        );
        setIsNumberList(
          $isListNode(parentList) && parentList.getListType() === 'number'
        );
      }
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      1
    );
  }, [editor, updateToolbar]);

  const ToolbarButton = ({ active, icon, onClick }: ToolbarButtonProps) => (
    <button
      className={`p-2 rounded-md transition-colors ${
        active ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {icon}
    </button>
  );

  const formatHeading = (headingTag: 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const anchorNode = selection.anchor.getNode();
      const targetNode = $findMatchingParent(anchorNode, (node) => $isHeadingNode(node)) ||
                         anchorNode.getParentOrThrow();
      
      // 이미 같은 제목 태그면 일반 텍스트로 변경
      if ($isHeadingNode(targetNode) && targetNode.getTag() === headingTag) {
        const paragraph = $createParagraphNode();
        targetNode.replace(paragraph);
        return;
      }

      // 새 제목 노드 생성
      const headingNode = $createHeadingNode(headingTag);
      if ($isHeadingNode(targetNode)) {
        targetNode.replace(headingNode);
      } else {
        const parent = targetNode.getParentOrThrow();
        parent.insertAfter(headingNode);
      }

      headingNode.append(...targetNode.getChildren());
      targetNode.remove();
      
      // 커서 위치 설정
      selection.insertNodes([headingNode]);
    });
  };

  return (
    <div className="flex space-x-1 overflow-x-auto">
      <ToolbarButton
        active={isBold}
        icon={<BoldIcon className="h-4 w-4" />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      />
      <ToolbarButton
        active={isItalic}
        icon={<ItalicIcon className="h-4 w-4" />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
      />
      <ToolbarButton
        active={isUnderline}
        icon={<UnderlineIcon className="h-4 w-4" />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
      />
      <ToolbarButton
        active={isStrikethrough}
        icon={<StrikethroughIcon className="h-4 w-4" />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
      />
      <div className="h-6 w-px bg-gray-200 mx-1" />
      <ToolbarButton
        active={isH1}
        icon={<Heading1Icon className="h-4 w-4" />}
        onClick={() => {
          formatHeading('h1');
        }}
      />
      <ToolbarButton
        active={isH2}
        icon={<Heading2Icon className="h-4 w-4" />}
        onClick={() => {
          formatHeading('h2');
        }}
      />
      <ToolbarButton
        active={isH3}
        icon={<Heading3Icon className="h-4 w-4" />}
        onClick={() => {
          formatHeading('h3');
        }}
      />
      <div className="h-6 w-px bg-gray-200 mx-1" />
      <ToolbarButton
        active={isBulletList}
        icon={<ListIcon className="h-4 w-4" />}
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
      />
      <ToolbarButton
        active={isNumberList}
        icon={<ListOrderedIcon className="h-4 w-4" />}
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
      />
      <div className="h-6 w-px bg-gray-200 mx-1" />
      <ToolbarButton
        active={isCode}
        icon={<CodeIcon className="h-4 w-4" />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        }}
      />
    </div>
  );
} 