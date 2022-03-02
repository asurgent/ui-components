import React, { useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as C from './Markdown.styled';
import { makeDirtyHTML, sanitizeHtml, unescapeBackslashes } from './helpers';

const propTypes = {
  markdown: PropTypes.string,
  flavor: PropTypes.oneOf(['original', 'vanilla', 'github']),
  className: PropTypes.string,
  foldQuotes: PropTypes.bool,
};

const defaultProps = {
  markdown: '',
  flavor: 'github',
  className: '',
  foldQuotes: false,
};

const Markdown = ({
  markdown,
  flavor,
  foldQuotes,
  className,
  ...props
}) => {
  const body = useRef(null);
  const html = useMemo(() => {
    const unescapedHTML = unescapeBackslashes(markdown);
    const dirtyHTML = makeDirtyHTML({ markdown: unescapedHTML, flavor });

    return sanitizeHtml({ dirtyHTML });
  }, [flavor, markdown]);

  useEffect(() => {
    if (foldQuotes && body.current) {
      const elements = body.current.getElementsByTagName('blockquote');
      if (elements?.length > 0) {
        const clickAction = ({ target }) => {
          target.classList.remove('collapsed');
          target.removeEventListener('click', clickAction);
        };

        Array.from(elements).forEach((element) => {
          element.classList.add('collapsed');
          element.addEventListener('click', clickAction);
        });

        return () => {
          Array.from(elements).forEach((element) => {
            if (element && typeof element.removeEventListner === 'function') {
              element.removeEventListener('click', clickAction);
            }
          });
        };
      }
    }
    return null;
  }, [body, foldQuotes]);

  /* eslint-disable-next-line react/no-danger */
  return (
    <C.Markdown
      ref={body}
      foldQuotes={foldQuotes}
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
};

Markdown.propTypes = propTypes;
Markdown.defaultProps = defaultProps;

export default Markdown;
