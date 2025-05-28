import type { ElementTransformer } from '@lexical/markdown';
import {
  $createHorizontalRuleNode,
  HorizontalRuleNode,
} from '@lexical/react/LexicalHorizontalRuleNode';
import type { ElementNode, LexicalNode } from 'lexical';

const CustomHorizontalRule: ElementTransformer = {
  type: 'element',
  regExp: /^(\-\-\-|\*\*\*|___)(\s)?$/,
  replace: (
    parentNode: ElementNode,
    _children: LexicalNode[],
    _match: string[],
    _isImport: boolean
  ) => {
    parentNode.replace($createHorizontalRuleNode());
    return true;
  },
  export: (node) => {
    return node instanceof HorizontalRuleNode ? '---' : null;
  },
  dependencies: [HorizontalRuleNode],
};


export default CustomHorizontalRule;