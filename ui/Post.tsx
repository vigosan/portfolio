import Link from 'next/link';
import cn from '../utils/cn';
import dateFormatter from '../utils/dateFormatter';
import markdownToHtml from '../lib/markdownToHtml';

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
};

function Post({ as: Element = 'article', children, className }: Props) {
  return <Element className={cn('group', className)}>{children}</Element>;
}

type DatetimeProps = Omit<Props, 'children'> & {
  children: string;
};

Post.Header = function Body({
  as: Element = 'div',
  children,
  className,
}: Props) {
  return (
    <Element className={cn('flex items-center gap-x-4', className)}>
      {children}
    </Element>
  );
};

Post.Datetime = function Datetime({
  as: Element = 'time',
  children,
  className,
}: DatetimeProps) {
  const formattedDate = dateFormatter(children);

  return (
    <Element dateTime={children} className={className}>
      {formattedDate}
    </Element>
  );
};

Post.Category = function Category({ children, className }: Props) {
  return (
    <Link href="" className={className}>
      {children}
    </Link>
  );
};

Post.Title = function Title({
  as: Element = 'h1',
  children,
  className,
}: Props) {
  return (
    <Element className={className}>
      <span />
      {children}
    </Element>
  );
};

Post.Excerpt = function Excerpt({
  as: Element = 'p',
  children,
  className,
}: Props) {
  return <Element className={className}>{children}</Element>;
};

type ContentProps = Omit<Props, 'children'> & {
  children: string;
};

Post.Content = async function Excerpt({
  as: Element = 'div',
  children,
  className,
}: ContentProps) {
  const html = await markdownToHtml(children || '');

  return (
    <Element className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

Post.Body = function Body({ as: Element = 'div', children, className }: Props) {
  return <Element className={className}>{children}</Element>;
};

type LinkProps = Props & {
  href: string;
};

Post.Link = function PostLink({ children, className, href }: LinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default Post;
