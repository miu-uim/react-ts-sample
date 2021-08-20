import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error"; // この文字列しか受け取れない型指定
};
export const useMessage = () => {
  const toast = useToast();

  const showMessage = useCallback((props: Props) => {
    const { title, status } = props;
    toast({
      // propsとしてメッセージの内容とエラーかどうかなどの種類を受け取る
      title, // title : title なので省略
      status,
      position: "top",
      duration: 2000, // メッセージ2秒残る
      isClosable: true, // 閉じれるかどうか
    });
  }, [toast]);
  return { showMessage };
};
