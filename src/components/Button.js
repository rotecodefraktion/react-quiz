const Button = ({
  clickAction,
  index,
  className,
  disabled = false,
  children,
}) => {
  console.log(className);
  return (
    <button
      className={className}
      key={index}
      onClick={() => clickAction(index)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
