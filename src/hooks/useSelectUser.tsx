import { useCallback, useState } from "react";
import { User } from "../types/api/user";

// idと今のユーザーの一覧があれば選択されたユーザーを特定できる
type Props={
    id:number;
    users: Array<User>;
    onOpen:()=>void
}

// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectUser = () => {
  // 選択されたユーザーの情報を持つstate
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // ユーザーがクリックされたときにユーザーを特定する関数
  const onSelectUser = useCallback((props:Props) => {
      // 受け取ったユーザーのidと一覧を元に特定
      const {id, users, onOpen}=props;
      const targetUser = users.find((user)=>user.id === id)
      // findで見つからない場合はundefinedが返されるので、
      // <User|null>の型にあてはまらないとエラーが出る。
      // findでは必ず何かしらと一致するので、明示的にundefinedの可能性を排除する。
      setSelectedUser(targetUser!);
      onOpen()
  }, []);

  return { onSelectUser,selectedUser };
};
