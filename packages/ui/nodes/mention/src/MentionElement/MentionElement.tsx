import React from 'react';
import { getHandler } from '@udecode/plate-core';
import { getRootProps } from '@udecode/plate-styled-components';
import { useFocused, useSelected } from 'slate-react';
import { getMentionElementStyles } from './MentionElement.styles';
import { MentionElementProps } from './MentionElement.types';

export const MentionElement = (props: MentionElementProps) => {
  const {
    attributes,
    children,
    nodeProps,
    element,
    prefix,
    as,
    onClick,
    renderLabel,
  } = props;

  const rootProps = getRootProps(props);

  const selected = useSelected();
  const focused = useFocused();

  const styles = getMentionElementStyles({ ...props, selected, focused });

  return (
    <span
      {...attributes}
      as={as}
      data-slate-value={element.value}
      className={styles.root.className}
      css={styles.root.css}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      {...rootProps}
      {...nodeProps}
    >
      {prefix}
      {renderLabel ? renderLabel(element) : element.value}
      {children}
    </span>
  );
};
