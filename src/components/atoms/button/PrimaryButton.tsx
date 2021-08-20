import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  disabled?: boolean; // 何も入っていないときもあるので?でfalse
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  // disabledとloadingは何も入ってこない可能性があるため初期値でfalseにしておく。
  const { children, onClick, disabled = false, loading = false } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      _hove={{ opacity: 0.8 }}
      disabled={disabled || loading} // chakraUIの便利な機能1
      isLoading={loading} // chakraUIの便利な機能2
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
