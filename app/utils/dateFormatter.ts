export default function dateFormatter(str: string) {
  const date = new Date(str);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const locale = 'en';

  return new Intl.DateTimeFormat(locale, options).format(date);
}
