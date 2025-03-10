import { PlateEditor } from '../../../types/PlateEditor';
import { DeserializeHtmlNodeReturnType } from '../types';
import { htmlBodyToFragment } from './htmlBodyToFragment';
import { htmlBrToNewLine } from './htmlBrToNewLine';
import { htmlElementToElement } from './htmlElementToElement';
import { htmlElementToLeaf } from './htmlElementToLeaf';
import { htmlTextNodeToString } from './htmlTextNodeToString';
import { isHtmlElement } from './isHtmlElement';

/**
 * Deserialize HTML element or child node.
 */
export const deserializeHtmlNode = <T = {}>(editor: PlateEditor<T>) => (
  node: HTMLElement | ChildNode
): DeserializeHtmlNodeReturnType => {
  const textNode = htmlTextNodeToString(node);
  if (textNode) return textNode;

  if (!isHtmlElement(node)) return null;

  // break line
  const breakLine = htmlBrToNewLine(node);
  if (breakLine) return breakLine;

  // body
  const fragment = htmlBodyToFragment(editor, node);
  if (fragment) return fragment;

  // element
  const element = htmlElementToElement(editor, node);
  if (element) return element;

  // leaf
  return htmlElementToLeaf(editor, node);
};
