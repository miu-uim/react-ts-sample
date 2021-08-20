import { memo, ReactNode, VFC } from "react";
import { Header } from "../organisms/layout/Header";

type Props = {
  // ReactNodeはタグで囲った要素を渡していける型の宣言。
  // childrenのようなタグで囲ったものを受け取るにはReactNode
  children: ReactNode;
};

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
