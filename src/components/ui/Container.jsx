export function Container({ as: Tag = 'div', size = 'default', className = '', children, ...rest }) {
  const width = size === 'wide' ? 'shell-wide' : size === 'narrow' ? 'mx-auto w-full max-w-3xl px-5 sm:px-7' : 'shell';
  return (
    <Tag className={`${width} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export default Container;
