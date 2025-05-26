type Props = {
    children: React.ReactNode;
    level?: 1 | 2 | 3;
  };
  
  export default function Heading({ children, level = 1 }: Props) {
    const Tag = `h${level}` as const;
    const classes = {
      1: "text-2xl font-bold text-primary",
      2: "text-xl font-semibold text-gray-800",
      3: "text-lg font-medium text-gray-700",
    };
  
    return <Tag className={classes[level]}>{children}</Tag>;
  }