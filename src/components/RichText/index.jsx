import { RichText as PrismicRichText } from 'prismic-reactjs';
import linkResolver from './linkResolver';
import HtmlSerializer from './HtmlSerializer';

const RichText = ({ content }) => {
  return PrismicRichText.render(content, linkResolver, HtmlSerializer);
};

export default RichText;
