import type { Schema, Attribute } from '@strapi/strapi';

export interface InfoBlockButton extends Schema.Component {
  collectionName: 'components_info_block_buttons';
  info: {
    displayName: 'button';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    color: Attribute.Enumeration<['turquoise', 'orange', 'beige']> &
      Attribute.Required &
      Attribute.DefaultTo<'turquoise'>;
    slug: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'info-block.button': InfoBlockButton;
    }
  }
}
