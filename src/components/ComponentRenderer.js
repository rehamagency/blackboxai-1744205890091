import React from 'react';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import ButtonBlock from './ButtonBlock';
import TokenInfoBlock from './TokenInfoBlock';

export default function ComponentRenderer({ component }) {
  switch(component.type) {
    case 'text':
      return <TextBlock {...component.props} />;
    case 'image':
      return <ImageBlock {...component.props} />;
    case 'button':
      return <ButtonBlock {...component.props} />;
    case 'tokenInfo':
      return <TokenInfoBlock {...component.props} />;
    default:
      return null;
  }
}