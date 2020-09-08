import React, { FunctionComponent } from "react";

type IconProps = {
  name: "not-favorite" | "favorite";
  onClick?: () => void;
};

const Icon: FunctionComponent<IconProps> = (props) => {
  const { name } = props;
  const src = require(`./icons/${name}.svg`);
  return <img src={src} {...props} />;
};

export default Icon;
